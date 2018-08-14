# Erlang OTP 新手教程


译自 <https://github.com/hcvst/erlang-otp-tutorial>.

这是一篇写给 Erlang 新手的 Erlang/OTP 教程。若你已熟悉 Erlang 语法，知道如何编译模块，有探索 OTP 的好奇心，想在你自己的应用程序中发挥它的能力，那么本教程是为你量身定制的。我们以一个非 OTP 的服务器和监督器（supervisor）开始，看看它们有何不足，然后改进为正确的 OTP 应用程序。

本教程会涉及：

- 如何白手起家一个非 OTP 服务器，并使用非 OTP 监督器实现自动重启。
- 这种实现有何缺点，如何用 OTP 克服。
- 略略介绍下使用 rebar 之类的工具捋顺 OTP 之旅，了解文件组织的惯例。
- 如何使用 OTP 的 `gen_server` 和监督器行为。
- 连结这一切的 OTP 应用程序行为

不过我们先来几发开场白。

## 你

熟悉 Erlang 语法，知道 Erlang 模块，怎样编译，了解一些诸如递归和单次赋值变量的函数式编程概念了吗？答案是肯定的？好极了，来学点 OTP 吧。你会发现起步并不难，但让我先简单说说我的 Erlang 体验吧。

## 我

我跟你还在同一起跑线呢，不同之处可能只在于，我已经开始阅读 Manning 的 Erlang & OTP in action 这本书（中译版[《Erlang/OTP 并发编程实战》](http://www.ituring.com.cn/book/828)）。毫无夸张地说，这是一本我最爱的技术书籍之一，里面容易吸收的知识随处可见。可以的话买一本。

同等水平的人教同等水平的人，我觉得就是心理学课程所说的“脚手架”。写这篇教程，一是加固我对 OTP 的理解，二是当作你学 OTP 的助推器。一起学习，如果觉得哪不对请留言。

## OTP

OTP 表示 Open Telecom Platform（开放通信平台），虽然叫这名，但它并不必一定要跟通信应用程序搭上关系。把 OTP 当作一个 Erlang 平台的框架，有了它可以写出健壮和高可用性的应用程序。

特别是，用这几个概念来理解 OTP 你可能会觉得更合理：

- 要求模块暴露哪些函数的一种规范（被称为“行为”）
- 遵循某个行为并实现相应函数的一个具体模块
- 在 OTP 语境下执行拥有行为的模块的运行时组件

大致可以类比面向对象中的：

- 定义行为的接口或抽象类
- 接口或抽象类的实现
- 管理实现的实例的容器

当然，这只是表面的相似而已。已有的知识对我们理解新概念可能会有所帮助，但苹果和桔子必须是要分清的啊。

## 非 OTP 的服务器

开场白叽歪完了，让在同一水平的我们来写一个非 OTP 的简易服务器吧。这是代码：

```erl
%%%---------------------------------------------------------------------------
%%% @doc 非 OTP 的建议服务器
%%% @author Hans Christian v. Stockhausen
%%% @end
%%%---------------------------------------------------------------------------

-module(no_otp).                     % 模块名（跟 erl 文件名一致,
                                     % 例如 no_otp.erl）

%% API
-export([                            % 需暴露出去的函数，亦即 API
  start/0,                           % - 启动新的服务器进程
  stop/0,                            % - 关停服务器
  say_hello/0,                       % - 打印 "Hello" 到标准输出
  get_count/0                        % - 回复轮询主体的调用次数
  ]).

%% 回调
-export([init/0]).                   % 暴露出来以便在 start/0 中创建
                                     % 单独列出来提示客户端不要使用

-define(SERVER, ?MODULE).            % SERVER 宏是 MODULE 的别名，
                                     % 会展开成 'no_otp'

-record(state, {count}).             % 服务器状态的记录。
                                     % 有点随心所欲，
                                     % 用来追踪主要轮询的频度 - 见 loop/1


%=============================================================================
% API - 客户端跟服务器交互的函数
%=============================================================================

start() ->                           % 创建调用 init/0 的新进程
  spawn(?MODULE, init, []).          % 返回新进程的 PID

stop() ->                            % 发送 stop 原子到进程
  ?SERVER ! stop,                    % 吩咐服务器关闭
  ok.                                % 并返回 ok 给调用者

say_hello() ->                       % 发送 say_hello 原子到进程
  ?SERVER ! say_hello,               % 以打印 "Hello" 到标准输出
  ok.

get_count() ->                       % 给调用者发送 Pid 和 get_count 原子
  ?SERVER ! {self(), get_count},     % 请求 count 的值
  receive                            % 等待匹配的响应并返回
    {count, Value} -> Value          % Value 给调用者
  end.


%=============================================================================
% 回调函数 - 客户端不要直接用
%=============================================================================

init() ->                            % 会被 start/0 触发
  register(?SERVER, self()),         % 在 no_otp 注册新进程 PID
  loop(#state{count=0}).             % 启动服务器的主要轮询

%=============================================================================
% 内部函数 - 注意，这些函数不暴露
%=============================================================================

loop(#state{count=Count}) ->         % 服务器的主要轮询
  receive Msg ->                     % API 函数发送消息时
    case Msg of                      % 检查里面包含的原子
      stop ->                        % 如果是 'stop' 原子
        exit(normal);                %   退出进程
      say_hello ->                   % 如果是 'say_hello' 原子
        io:format("Hello~n");        %   写 "Hello" 到标准输出
      {From, get_count} ->           % 如果 Msg 是元组 {Pid(), get_count}
        From ! {count, Count}        % 以标记元组 {count, Value} 的形式
    end                              %   回复当前的计数值
  end,
  loop(#state{count = Count + 1}).   % 以已更新的状态递归
```

## 试验

- 保存上面的代码到 no_otp.erl 文件。
- 在文件所在目录中以 `erl` 命令打开 Erlang shell。
- 编译模块：`c(no_otp)`。
- 启动服务器：`no_otp:start()`。
- 调教服务器打印几次“Hello”：`no_otp:say_hello()`。
- 查询当前计数器的值：`no_otp:get_count()`。
- 关闭服务器：`no_otp:stop()`。

这是我的 shell 纪录。诚然，你想知道 `get_count/0` 意义何在。没有什么目的，只是想演示如何实现一个同步函数。

```
Eshell V9.2  (abort with ^G)
1> c(no_otp).
{ok,no_otp}
2> no_otp:start().
<0.70.0>
3> no_otp:get_count().
0
4> no_otp:say_hello().
Hello
ok
5> no_otp:get_count().
2
6>
```

对于这个语境下*服务器*这个术语，一开始我很困惑。这怎么就成了一个服务器啦？细思量，这跟分发此页面到你浏览器的 HTTP 服务器异曲同工。除非停掉否则会一直运行，它遵守某种协议（只不过是 Erlang 的内部信息协议而非 HTTP 协议），对输入回应消息或执行副作用的操作。这就是个服务器，没错。

我不打算讨论代码细节，注释已详述。我只想简单说说代码结构：

- 用一层薄薄的 API 层对客户端隐藏实现细节。`start/0`，`stop/0` 等函数把客户端从内部协议（比如这些函数要发送的原子 `start`，`stop` 等等）和内部函数解耦出来。这样更改两者中任何一个都不会破坏客户端代码。
- `init/0` 函数初始化状态并启动服务器的主要轮询，并按惯例以模块名注册服务器，也可以同时执行诸如连接数据库初始化等操作。注意，尽管并不想让客户端调用，但也要把这个函数暴露出来，否则在 `init/0` 里调用不了 `spawn/3`。
- 主要轮询等待消息，在回应中执行一些动作，必要时更新服务器状态，最后又反复调用自身。

## 有何问题？

真没什么毛病。有了 Erlang 它就能一直跑一直跑一直跑。我们有足够的信心认为它是正确无误的实现，毕竟是个非常简单的服务器。同时，依托于 API，发送格式不对的数据，客户端也不会意外崩溃——哦，能打包票吗？

照前面的步骤启动服务器，然后在 shell 终端键入 `no_otp ! crash.`。

服务器注册到 `no_otp` 下（参见`init/0`），因此我们可以随心所欲给它发送乱七八糟的消息，但代码里并没有匹配 `crash` 的从句。哦哟！真的 crash (崩溃) 了。

怎么办？我们可以加上一条匹配任何消息，不对消息做任何回应的从句就好了。然而，我们知道这跟处理异常时不区分类型一刀切的捕获一样是有害的，臭虫可能会遁地无形。

Erlang 信仰的哲学是“鼓励崩溃”。别嫌我啰嗦，这段话要过目几遍。让我给你——Erlang 程序员——划下重点：别防御，不要囊括所有状况，专注规范，专注代码需求并保持精炼紧凑。如果代码出错，虽会崩溃但可修复。因客户端代码出错的崩溃，随它崩，在保存良好的状态中重启，而不是不惜一切代价让它一直运行。不要为了解决客户端的烂摊子而去编写更复杂的代码，让客户端去修复，了解了么？

## 监督

好吧，随它崩，但崩溃后怎么样自动重启服务器呢？答案是编写另一个进程，用来监视服务器，一旦发现服务器挂了就重启。这个进程就叫做*监督器*，接下来是非 OTP 版本的代码。

## 非 OTP 监督器

开始前先看看以下带注解的 Erlang shell 纪录，了解下如何练习。函数 `whereis/0` 返回注册到某个名字上的进程的 `Pid`。可以看到 `sup:start_server/0` 已经启动了 `no_otp` 服务器，因为它显示了进程标识 `<0.72.0>`。自动重启看起来也跟预期的一样没有什么问题。

```
Eshell V9.2  (abort with ^G)
1> c(sup).                                   % 编译监督器模块
{ok,sup}
2> sup:start_server().                       % 启动监督器
<0.70.0>                                     % 得到进程标识 ..70..
3> whereis(no_otp).                          % 看看 `no_otp` 进程在哪
<0.72.0>                                     % 得到 ..72..
4> no_otp:say_hello().                       % 试试 API
Hello                                        % 没毛病
ok
5> no_otp:get_count().                       % 也没毛病
1
6> no_otp ! crash.                           % 是时候让它崩溃了
crash

=ERROR REPORT===
Error in process <0.40.0> with exit value:
  {{case_clause,crash},[{no_otp,loop,1}]}   % 如其所愿，发生 case_clause 错误

7> no_otp:get_count().                      % 但新进程已启动
0                                           % 证据在此
8> no_otp:stop().                           % 正常的方式停止
ok
9> whereis(no_otp).                         % 检查新的实例
undefined                                   % 然而并没有。正确！
10>

```

这是我们的监督器代码：

```erl
%%%----------------------------------------------------------------------------
%%% @doc 非 OTP 监督器
%%% @author Hans Christian v. Stockhausen
%%% @end
%%%----------------------------------------------------------------------------

-module(sup).

%% API
-export([start_server/0]).

%% Callbacks
-export([supervise/0]).

%%=============================================================================
%% API
%%=============================================================================

start_server() ->
  spawn(?MODULE, supervise, []).

%%=============================================================================
%% Callbacks
%%=============================================================================

supervise() ->
  process_flag(trap_exit, true),    % 链接进程挂了之后，
                                    % 不要崩溃，而是发一条消息
  Pid = no_otp:start(),             % 启动服务器
  link(Pid),                        % 并链接
  receive {'EXIT', Pid, Reason} ->  % 等待通知进程关闭的消息
    case Reason of                  %
      normal -> ok;                 % 如果理由是 'normal'，无视
      _Other -> start_server()      % 否则重新来过
   end
  end.
```

在开场白提到，我也是个 Erlang 菜鸟。我对上面的监督器代码并没有多少信心，*这正是问题所在*。用 “Erlang 流” 来写应用程序，要拥抱“鼓励崩溃”的哲学，必须以服务器，监督器，监督器的监督器为单位来组织代码。大量结构性，重复的样板代码，给臭虫的引入提供了充足的机会。服务器和监督器层级的概念不难理解，但能不能也容易做对呢？

## OTP 打救你

很幸运，有人已经解决了大难题。OTP 这个特制的框架，有助于组合服务器、监督器和其他组件，我们稍后会一探究竟。OTP 开发者提供了一个坚如磐石，久经沙场，谁都知道能用的框架，我们可以接入自己的，可能是脆弱的代码。

到用 OTP 行为重写服务器和监督器的时候了。我们先看看两个有所裨益的工具。

## Rebar 和 Emacs

有了 OTP，不必重做监督层级的轮子，但任然需要手工输入一定量的代码，填充样板很快就会厌恶。而且，要养成用 Edoc 注释写文档的好习惯，还需更多的重复输入。因此，我们需要一个小帮手。

**[Rebar](https://github.com/rebar/rebar)** 是 Erlang 的构建工具。我只涉及必要部分。

运行以下命令，安装 rebar 并创建 "hello" 应用的脚手架。

```shell
mkdir hello
cd hello
wget https://raw.github.com/wiki/rebar/rebar/rebar
chmod u+x rebar
./rebar create-app appid=hello

```

新创建的 `src` 目录中生成以下文件：

- `hello_app.erl`: OTP 应用程序行为（现在先不用管）
- `hello.app.src`: OTP 应用程序配置模版（也先不管吧）
- `hello_sup.erl`: 根监督器的最小实现

缺少的是包含服务器的文件，让 rebar 来生成一个。

```shell
./rebar create template=simplesrv srvid=hello_server
```

不想用 rebar，你也可以手工创建这些文件，并放到 `src` 目录下。`src` 命名是个惯例，稍后我会解释。

**Emacs** 提供 Erlang 模式，真的能加速“编辑-编译-运行”交替的开发方式，还提供了模版。我常用 vi 来完成日常编辑，但总想试试 Emacs。Erlang 模式正是好机会，还没用 Emacs 的话我建议你也试试。

(*译注：省略部分关于 Emacs 的例子，无关大体*)

## OTP 文件夹

使用以下命令

```shell
mkdir -p my_app/{doc,ebin,priv,include,src,test}
```

可以创建 OTP 文件夹结构，也可用 **rebar** 帮忙。只有 `src` 和 `ebin` 是必须的。

- `doc`: 文档，通常是自动生成的
- `ebin`: 编译好的代码（`.beam`）
- `priv`: 诸如 html，css 之类的资源文件
- `include`: 客户端可能用到的公共头文件（`.hrl`）
- `src`: 代码和私有头文件（`.erl`，`.hrl`）
- `test`: 测试（`_test.erl`）

## OTP `gen_server`

如其名，`gen_server` 行为帮我们写通用服务器。这是用 OTP 行为重写的服务器。

```erl
%%%----------------------------------------------------------------------------
%%% @doc OTP gen_server 例子
%%% @author Hans Christian v. Stockhausen
%%% @end
%%%----------------------------------------------------------------------------

-module(hello_server).         % 这部分没什么新鲜的，
                               %  除了下一行，我们会告诉编译器
-behaviour(gen_server).        %  此模块实现 gen_server 行为。
                               %  编译器会警告我们，
-define(SERVER, ?MODULE).      %  如果不提供行为要求的回调函数。
                               %  它通过调用
-record(state, {count}).       %  gen_server:behaviour_info(callbacks)
                               %  能找到响应函数。试试看。
%%-----------------------------------------------------------------------------
%% API 暴露函数
%%-----------------------------------------------------------------------------

-export([                      % 跟之前定义 API 函数一样
  start_link/0,                % - 启动并链接进程，一步到位
  stop/0,                      % - 关停
  say_hello/0,                 % - 答应 "Hello" 到标准输出
  get_count/0]).               % - 返回计数状态

%% ---------------------------------------------------------------------------
%% gen_server 暴露函数
%% ---------------------------------------------------------------------------

-export([                      % 行为回调函数
  init/1,                      % - 初始化进程
  handle_call/3,               % - 处理同步调用（有回复）
  handle_cast/2,               % - 处理异步调用（无回复）
  handle_info/2,               % - 处理带外消息(以 ! 发送)
  terminate/2,                 % - 在关闭时调用
  code_change/3]).             % - 处理代码变更

%% ---------------------------------------------------------------------------
%% API 函数定义
%% ---------------------------------------------------------------------------

start_link() ->                % start_link 以一步原子操作创建和链接进程
    gen_server:start_link(     % 参数：
      {local, ?SERVER},        %  - 本地进程的注册名
      ?MODULE,                 %  - init/1 回调函数所在模块
      [],                      %  - init/1 所需参数
      []).                     %  - start_link 的其他选项

stop() ->                      % 注意我们不用 ! 了
    gen_server:cast(           %  用 cast 异步发送消息到注册的名字
      ?SERVER,                 %  这是异步的，
      stop).                   %  我们不想要回复

say_hello() ->                 % 跟 stop 差不多，
    gen_server:cast(           %  只不过是发送 say_hello 原子。
      ?SERVER,                 %  也不想要回应，
      say_hello).              %  只对副作用感兴趣。

get_count() ->                 % 而在此，我们希望得到回应，
    gen_server:call(           %  因此使用 call 同步触发服务器。
      ?SERVER,                 %  这个调用是阻塞的，直到得到回应。
      get_count).              %  gen_server:call/2 帮我们
                               %  隐藏 send/receive 逻辑。漂亮。
%% ---------------------------------------------------------------------------
%% gen_server 函数定义
%% ---------------------------------------------------------------------------

init([]) ->                    % 这是行为的回调函数。
    {ok, #state{count=0}}.     % init/1 在 gen_server:start_link/4 中调用，
                               % 并初始化状态

handle_call(get_count, _From, #state{count=Count}) ->
    {reply,
     Count,                    % 同步回复 Count
     #state{count=Count+1}     % 同时更新状态
    }.

handle_cast(stop, State) ->    % 这是第一个 handle_case 从句，处理 stop 原子。
    {stop,                     % 我们吩咐 gen_server 正常停止
     normal,                   % 并返回当前的 State，不要作任何改变
     State                     %
    };                         % 注意这有个分号

handle_cast(say_hello,
            State) ->          % 处理 say_hello 原子
    io:format("Hello~n"),      % 打印 "Hello"
    {noreply,                  % 这也是异步的，所以是 noreply
    #state{count=
      State#state.count+1}
    }.                         % 同时更新状态

handle_info(Info, State) ->    % handle_info 处理带外消息，
    error_logger:info_msg("~p~n", [Info]),
    {noreply, State}.          % 比如不是经由 cast 或 call 发出的消息。
                               % 在此我们只是简单记录下消息

terminate(_Reason, _State) ->  % 这是由 gen_server 容器在关闭时触发的。
    error_logger:info_msg("terminating~n"),
    ok.                        % 我们记录下来，并回复 ok.

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.               % 升或降级的发布时更新内部状态

%% ------------------------------------------------------------------
%% 内部函数定义
%% ------------------------------------------------------------------

% 还没有呢。
```

进入应用程序目录（前面提到的 `src` 的上级）并运行 `./rebar compile`，或者，你还没有用 rebar 的话，运行 `erlc -o ebin scr/*.erl`，就可以编译这个 OTP 服务器了。rebar 会自动创建 `ebin` 目录，用 `erlc` 请先自行创建该目录。

来测试下这个 OTP 服务器，这是输出：

```
$> erl -pa ebin                # 以 -pa (path add，加入路径) ebin 为参启动 erl
1> hello_server:start_link().  % 启动服务器
{ok,<0.34.0>}
2> hello_server:say_hello().   % 试试 say_hello/0 这个 API 函数
Hello
ok
3> hello_server:get_count().   % 观察服务器如何追踪状态
1
4> hello_server:get_count().
2
5> hello_server ! stop.        % 发送带外信息

=INFO REPORT===                % error_logger 的输出
stop
stop
6> hello_server:stop().        % 调用 stop/0 API 函数

=INFO REPORT===                % 这是 terminate 输出的信息
terminating
ok
7> whereis(hello_server).      % 进程已不存在
undefined
8>
```

从非 OTP 版本到 OTP 的 `gen_server`，予我们何益？

- 首先，熟悉 `gen_server` 的开发者一眼就看出代码的组织形式，暴露的 API 和实现细节之处。这就是模式的力量。
- 三种不同的消息机制：同步、异步和带外。

当然不止这些。如下记录所示，开启 SASL (System Application Support Libraries，系统程序支持库)，然后强行崩溃，会收到非常有用的错误报告，这是非 OTP 版本所不具备的。

```
1> application:start(sasl).                    % 开启 SASL
ok
2>
=PROGRESS REPORT====                           % 为省版面我删了启动消息
          application: sasl                    % 只保留了最后一条
          started_at: nonode@nohost            % SASL 起来了。

2> hello_server:start_link().                  % 启动服务器
{ok,<0.44.0>}
3> whereis(hello_server).                      % 检查是否已注册
<0.44.0>
4> gen_server:cast(hello_server, crash).       % 来，崩了它

=INFO REPORT==== 17-Dec-2012::11:00:56 ===     % 不错，gen_server 调用了 terminate
terminating                                    % 因此可以清理，关闭 sockets 等操作

=ERROR REPORT==== 17-Dec-2012::11:00:56 ===    % 以下是 SASL 的报告
** Generic server hello_server terminating     % 只需用 OTP 就无偿获得
** Last message in was {'$gen_cast',crash}
** When Server state == {state,0}
** Reason for termination ==                   % 嗯嗯，这就是出错的地方
** {function_clause,[{hello_server,handle_cast,[crash,{state,0}]},
                     {gen_server,handle_msg,5},
                     {proc_lib,init_p_do_apply,3}]}

=CRASH REPORT==== 17-Dec-2012::11:00:56 ===    % 这里有更多环境信息
  crasher:
    initial call: hello_server:init/1
    pid: <0.44.0>
    registered_name: hello_server
    exception exit: {function_clause,
                        [{hello_server,handle_cast,[crash,{state,0}]},
                         {gen_server,handle_msg,5},
                         {proc_lib,init_p_do_apply,3}]}
      in function  gen_server:terminate/6
    ancestors: [<0.32.0>]
    messages: []
    links: [<0.32.0>]
    dictionary: []
    trap_exit: false
    status: running
    heap_size: 377
    stack_size: 24
    reductions: 142
  neighbours:
    neighbour: [{pid,<0.32.0>},
                  {registered_name,[]},
                  {initial_call,{erlang,apply,2}},
                  {current_function,{io,wait_io_mon_reply,2}},
                  {ancestors,[]},
                  {messages,[]},
                  {links,[<0.26.0>,<0.44.0>]},
                  {dictionary,[]},
                  {trap_exit,false},
                  {status,waiting},
                  {heap_size,2584},
                  {stack_size,30},
                  {reductions,6595}]
** exception exit: function_clause
     in function  hello_server:handle_cast/2
        called as hello_server:handle_cast(crash,{state,0})
     in call from gen_server:handle_msg/5
     in call from proc_lib:init_p_do_apply/3
5> whereis(hello_server).                      % 进程虽崩溃了，
undefined                                      % 至少以上报告给我们一个清晰的原因
```

## OTP 监督器

这是 rebar 生成的监督器模版，并未改造。

```erl
-module(hello_sup).

-behaviour(supervisor).

%% API
-export([start_link/0]).

%% 监督器回调
-export([init/1]).

%% 子监督器的宏助手
-define(CHILD(I, Type), {I, {I, start_link, []}, permanent, 5000, Type, [I]}).

%% ===================================================================
%% API 函数
%% ===================================================================

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

%% ===================================================================
%% 监督器回调
%% ===================================================================

init([]) ->
    {ok, { {one_for_one, 5, 10}, []} }.
```

哇，这代码不长呢！哇，这到底是什么东东？待会儿我们就会细究然后把模版留的坑埋了，让它能配合 `gen_server`。尽管细节尚需捋顺，但大部分是我们已经掌握的了。

- 这个模块实现了 OTP 监督器行为
- 里面有一个 `start_link/0` API函数和行为回调函数 `init/1`
- 整个模块里只有一次单一的函数调用：`supervisor:start_link/3`
- 神奇作用的 `init/1` 返回一个元组

好吧，`init/1` 是神奇所在。对比必须手动监视和重启服务器的非 OTP 版本，这里是一个纯宣言式的，尽管配置监督器容器的元组形式很是神秘。

`-define(CHILD(I, Type),...)` 什么来头？这是一个宏，像之前的老熟脸 `-define(SERVER, ?MODULE).`，只不过这次是两个参数。在宏名前加上 `?`，给 `I` 和 `Type` 赋值即可使用该宏。例如，`?CHILD(hello_server, worker)` 会在编译时展开为 `{hello_server, {hello_server, start_link, []}, , permanent, 5000, worker, [hello_server]}`。但这段代码里还没有用这个宏的地方，该怎么调教它呢？

看看 Emacs 怎样帮我们生成*监督器*模版。先忽视其它的，现在我们只对 `init/1` 函数感兴趣。来试试看，`M-x tmm-menubar, E, S, 1`。`E` 表示 Erlang；S 表示骨架（Skeletons），1 选择生成监督器。这是结果：

```erl
init([]) ->

  SupFlags = #{strategy => one_for_one,
               intensity => 1,
               period => 5},

  AChild = #{id => 'AName',
             start => {'AModule', start_link, []},
             restart => permanent,
             shutdown => 5000,
             type => worker,
             modules => ['AModule']},

  {ok, {SupFlags, [AChild]}}.
```

（注：此处译者根据 Emacs 25.3 有所调整）

这应比 rebar 生成的好理解。当然，至少在结构上，最终应返回同一种配置元组。把元组里 `AName` 和 `AModule` 替换为上面的 `hello_server` 并展开所有变量，会得到以下结构，同时我加上一些注释以便理解：

```erl
{ok,                      % ok, 这些就是监督器的要求
  {
    {                     % 监督器全局选项
      one_for_one,        % - 使用 one-for-one 重启策略
      1000,               % - 允许各个子进程 1000 次重启
      3600                % - 在一个小时内
    },
    [                     % 需监督的子进程列表
      {                   % 在此只有一个
        hello_server,     % - 注册到 hello_server 名下
        {                 % - 以下是查找和启动子进程的代码
          hello_server,   %   * 模块叫 hello_server
          start_link,     %   * 需要调用的函数叫 start_link
          []              %   * 这是默认参数列表
        },
        permanent,        % - 子进程应持续运行，崩溃后重启
        2000,             % - 系统停止时，提供 2 秒时间让子进程进行清理，然后再杀掉
        worker            % - 另外，这个子进程是工作者，不是监督器
        [hello_server]    % - 这些是进程用到的模块
      }
    ]
  }
}.
```

你可以自己决定使用哪种格式，rebar 的紧凑标记，emacs 的啰嗦模版或是上面这个展开的片段。作为练习，请实现监督器并编译。在测试前解释一下上面的参数。

- **`one_for_one`**: 这个重启策略指示监督器只重启崩溃了的子进程。我们例子中只有一个，多个被监督的子进程则不会受到影响。用 `one_for_all` 重启策略，一旦有子进程崩溃了就会自动重启所有的子进程。为自治进程配置 `one_for_one`。除此之外，来自紧凑耦合子系统的进程，最好是配置 `one_for_all` 以重启整个子系统。访问 <http://erlang.org/doc/man/supervisor.html> 作深入了解，特别关注下 `simple_one_for_one`，它可以进程工厂的方式使用监督器。
- **`permanent`**: 告诉监督器子进程总是重启（受全局重启规则的影响）。除此之外还有 `temporary` 和 `transient`。`temporary` 进程永不重启，但 `transient` 碰到异常终止时（比如崩溃）会。在我们例子中 `permanent` 是合适的，但在进程工厂场合中，`temporary` 和 `transient` 可能会更般配。
- **`worker`**: 在此我们要监督 `gen_server` ——它是工作者。构建监督器层级也很普遍。设置 `supervisor` 则表明子进程也是监督器。这有助于高效管理子进程。

来试试 OTP 监督者。

```
1> hello_sup:start_link().                % 启动根监督器
{ok,<0.34.0>}
2> whereis(hello_server).                 % 确认子进程连带启动
<0.35.0>
3> hello_server:say_hello().              % 调用子进程 API
Hello
ok
4> hello_server:get_count().              % 检查是否跟以前一样有效
1
5> gen_server:cast(hello_server, crash).  % 崩掉工作者进程

=INFO REPORT====                          % 不错，terminate 还是被调用了
terminating

=ERROR REPORT==== 17-Dec-2012::13:55:51 ===
** Generic server hello_server terminating
** Last message in was {'$gen_cast',crash}
** When Server state == {state,2}
** Reason for termination ==             % 可以看到崩溃原因
** {function_clause,[{hello_server,handle_cast,[crash,{state,2}]},
                     {gen_server,handle_msg,5},
                     {proc_lib,init_p_do_apply,3}]}
ok
6> whereis(hello_server).                % 新的子进程已经启动
<0.40.0>
7> hello_server:get_count().             % 显然，状态是初始化过的
0
8> hello_server:stop().                  % 调用 stop 这个 API 函数

=INFO REPORT===
terminating                              % 看起来没毛病
ok
9> whereis(hello_server).                % 监督器已开启另一个服务器
<0.44.0>
10>
```

这虽按照设计规则运行，但可能有些结果并不是想要的。`stop/0` 原本要停止进程，但监督器马上启动了另一个新实例。我们可以把重启参数更换为 `transient`, 但会留下一个无任何子进程的监督器。我觉得这没问题，比模模糊糊的结果好。因此让我们转移注意力到 **OTP 应用程序** 上，学习怎么整体上启动和停止应用程序。

## OTP 应用程序

前面已说过一个通过 `application:start(sasl)` 运行应用程序的例子：SASL。如何把根监督器和服务器打包到一起，用 SASL 的方式来运行呢？

跟 `gen_server` 和 `supervisor` 的实现不同，OTP 应用程序的 `application` 需要两个文件：一个通常命名为 `应用名称.app` 的配置文件，和命名为 `应用名称_app.erl` 的 Erlang 源文件。在我们的例子中就是：

- `ebin/hello.app`
- `src/hello_app.erl`

注意 `hello.app` 放在 `ebin` 目录中，显而易见，`.app` 文件告诉 Erlang 如何运行程序。通常不会分发源代码，只会保留编译好的 `.beam` 来发布程序，因此 `ebin` 才是 `.app` 归属。

作为 rebar 用户，你会发现多了一个前面提过的 `src/hello.app.src` 的文件，它是 `ebin/hello.app` 的模版，运行 `./rebar` 编译后生成。

这是 `rebar` 生成的 `hello_app.erl`，实现了 OTP `application` 行为，不用我说太多了吧：

```erl
-module(hello_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    hello_sup:start_link().

stop(_State) ->
    ok.
```

这是告诉 Erlang 如何启动应用程序的配置文件：

```erl
{application,hello,
  [{description,[]},
   {vsn,"1"},
   {registered,[]},
   {applications,[kernel,stdlib]},
   {mod,{hello_app,[]}},
   {env,[]},
   {modules,[hello_app,hello_server,hello_sup]}]}.
```

只是一个元组而已。第一个元素是 `application` 原子，第二是应用程序名称，接下来是键-值元组列表。使用 rebar 的话别忘了最后那个句点。简单看看键值对：

- `description`: 描述，我们可以改成“OTP 教程的 hello 应用程序”
- `vsn`: 应用程序版本
- `registered`: 应用程序将之注册到其下的名称列表。一般来说只有跟监督器的名称。本例子中应加上 `hello.sup`，但并不是必须的。
- `applications`: 依赖的应用程序列表。所有的应用都依赖于 `kernel` 和 `stdlib` 启动和运行。试试把 `sasl` 也添进去，看看启动时会发生什么事。
- `mod`: 告诉 Erlang 是哪个模块包含 `application` 行为。
- `env`: 传给应用程序的环境变量列表。
- `modules`: 组成应用程序的模块列表。

进入 Erlang shell，启动应用程序。

```
1> application:start(hello).
ok
2> whereis(hello_sup).
<0.37.0>
3> whereis(hello_server).
<0.38.0>
4> hello_server:say_hello().
Hello
ok
5> application:stop(hello).

=INFO REPORT==== 17-Dec-2012::15:37:47 ===
    application: hello
    exited: stopped
    type: temporary
ok
6> whereis(hello_sup).
undefined
7> whereis(hello_server).
undefined
```

棒棒，只需名字就能启动和停止应用程序了。可好玩的事儿没完呢，还记得把非 OTP 服务器换成 `gen_server` 时，如何通过 SASL 自动得到更详尽的报告吗？下次试试先 `appmon:strat()`（译注：新版 Erlang 已用 `observer:start()` 取代）启动应用程序监控器，在运行 `hello` 点击 hello 按钮就会显示进程的层级。漂亮极了，你觉得呢？
