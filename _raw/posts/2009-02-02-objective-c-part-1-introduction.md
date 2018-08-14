# Objective-C 学习笔记（一）——简介

C 可能是世界上最简洁且功能强大的语言，同为 C 的超集（C++现在可能不认为自己是 C 的超集或者相反，我们姑且如此认为吧，至少历史上有过这样的共识），Objective-C 比 C++ 要简洁得多。Objective, 顾名思义，对象者也，为不提供面向对象编程基本功能的 C 添加面向对象的支持，但它不像 C++ 繁冗复杂，最大限度上保持 C 的简洁性。

Objective-C 不像 C 有国际标准，它和 C++ 一样不存在标准。目前主要是 Apple 在维护，最近衍生了 Objective-C 2.0\. 使用 Objective-C 的大户也当属 Apple, 因此 Apple 提供的库属于准标准库了。对于开发 Mac 内在观感(native)的 UI 程序来说，使用的是 Cocoa 这个框架，包含 Foundation 和 Application Kit (AppKit). 

Objective-C 也使用头文件(header files)，后缀为 `.h`, 但使用 `.m`（即 message, 其他面向对象编程语言也叫 method），作为源文件的后缀。

Objective-C 引入了 `#import` 指令，它的作用不仅解决头文件重复包含的问题，而且只要引入框架的单个主头文件，就可以使用框架的所有功能。

使用和查看 Cocoa 提供的 API 时，通常会发现它们大部分以 NS 打头，它是 NeXTStep 的缩写，至于 NeXTStep 和 Apple 的渊薮，大家还是自己 Wikipedia 吧。这是因为 Objective-C 没有命名空间（name space），为避免冲突而加上的。作为一个良好的编程习惯，开发者不应再以 NS 开头命名自己的类和函数等，通常的习惯是使用自己或公司名称的缩写（Realazy 是否可以缩写成 RZ? 呵呵）。

另外，Cocoa 的编程风格鼓励表达清晰而非含糊的命名，所以你会看到 Cocoa 中非常长的、极少看到缩写的类名或消息名。