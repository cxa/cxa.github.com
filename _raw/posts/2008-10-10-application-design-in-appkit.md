---
title: AppKit 应用程序设计观
---

原文来自 [Application Design in AppKit][0].

This is a discussion of high-level application design in Cocoa that aims to explain the major class roles in an AppKit application and how they are connected. I'll show you much more detail than simply "Model-View-Controller" and I also give a specific example of how all the concepts apply to a real application.

这是一篇关于 Cocoa 高级应用程序设计的讨论，目的在于解释 AppKit 应用程序中的主类的作用，以及它们间的相互联系。我会向你展示比"模型-视图-控制器"更具体的细节，也会给出一个具体例子，展示这些概念是如何应用到一个真实的程序中去的。

## The anecdote 轶事

The other day, I was showing a friend how to program in Cocoa. She is a very good programmer but has never really programmed a user-application --- working almost exclusively on embedded and server applications.

不久前的一天，我向一位朋友介绍在 Cocoa 中如何编写程序。她是一位不错的程序员，但之前从没实战过用户交互的应用程序——几乎只编写嵌入式或服务器应用程序。

The experience reminded me that even good programmers can be unaware of basic design traits of user-applications which, while common to user-applications on all platforms, are not common to all programming.

这种经历告诉我，即使是好的程序员也不一定知道用户交互应用程序的设计的基本特性——虽然它在所有平台上的用户交互应用程序中非常普遍，但不见得在所有类型的编程都是常见的。

So even though it's more "novice" than my regular fare, it would appear that even simple topics can be useful to advanced programmers.

所以，即使这里讲到的比较菜，只是简单的主题，但对高级程序员也会很有帮助。

## A starting point 开门见山

"Model-View-Controller" is the term normally used to describe the structure of modern applications. Almost every discussion of application design begins with it and I guess I will too. It looks like this:

"模型-视图-控制器" 是用在描述现代应用程序结构的一个常见术语。几乎所有关于应用程序设计的讨论都会以它开头，我猜我也不能免俗。它大概是这个样子：

![MVC示例图](/assets/posts/2008_10_10/ModelViewController.png)

Your document data (the "model") notifies the intermediary (the "controller") and it tells your user interface elements ("the view") to update. Going back in the other direction, user actions in the user-interface trigger notifications to the intermediary which modifies the data.

文档的数据（"模型"）通知中间件（"控制器"）并告诉用户界面元素（"视图"）更新。从反向来说，中间件响应用户界面中的用户动作，并对数据进行修改。

The rationale may not be immediately obvious. Let me explain it this way:

这个原理并不是那么浅显易懂。看我这样解释行不行：

User applications are big and complex --- even seemingly simple applications. To manage complexity, everything is compartmentalised. To keep the boundaries between compartments clean, connections between compartments should be simple and generic.

用户应用程序是大型和复杂的——看起来简单的应用程序也是如此。为了管理复杂性，所有东西都划分管理。为了能保持部件边界的清晰性，它们之间的联系应该是简单和通用的。

Obviously, you don't want the model and view to be the same thing because then, there is no separation at all and the application will be a tangled mess.

显然，你并不想把模型和视图搞成一样的东西，因为完全没有分离的话只会让应用程序一团糟。

Direct connections between model and view are normally frowned upon because it creates a situation where they must know too much about each other's internal state to interoperate. Instead, a controller object (which knows about connective state but little else) is used to keep the interaction simple and generic.

如果模型和视图之间的联系是直接的，要想实现互用，两者必须深入了解对方的内部状态，这是一个纠葛的过程。反之，使用一个控制器对象（它能掌握大部分联系状态，其他的基本不管）来管理模型和视图的交互，就简单和通用多了。

## Better than Model-View-Controller 比模型-视图-控制器更胜一筹

These traits of Model-View-Controller are all good things but in reality, it says little about how to assemble an application. Real applications have many more traits in common than a separation between model and view.

模型-视图-控制器的原理非常好，但在实际操作中，它基本上没有指明应用程序该如何组织。真实的应用程序有着比模型和视图的分离更多的通用特性。

A more complete diagram of a typical application's design would look like this:

这是一个更完整的流程图，典型的应用程序设计更应如此：

![App design detail 示例图](/assets/posts/2008_10_10/DetailedAppDesign.png)

In this diagram, solid black arrows indicate construction and hierarchic ownership. Feint gray arrows indicate communication in response to changes.

在此图中，黑色的实心箭头表示结构和层级属主；灰色空心箭头表示对变化作出响应的通讯。

### Application instance 应用程序实例

The application instance incorporates the program entry point and the event loop (which handles all user events like mouse and keyboard actions). As the starting point of the program, the application instance constructs the other top-level objects in the program.

应用程序实例包含了程序入口的指针和事件循环（它处理所有的用户事件，如鼠标和键盘事件）。作为程序的起点，应用程序实例建立了程序中其他顶层的对象。

### Application controllers 应用程序控制器

The term "Application User Interface" is used in this part of the diagram to refer to elements of the user-interface that are not part of the document or the main window.

此图中的术语"应用程序用户界面"用于非文档或主窗口的用户界面元素。

These objects are constructed by the application at startup. They should only handle things which exist before the main window or main document is open or which fall outside the bounds of these areas. Example behavior here includes the application preferences window and the Mac OS X menu bar.

这些对象在应用程序启动时就构建。它们应该只处理出现在主窗口之前，开启主文档之前或超出这些范围边界的东西。这种行为的例子包括应用程序偏好设置，以及 Mac OS X 的菜单栏。

### Document instance 文档实例

This is the first point where a programmer begins to exercise control over the program's behavior. The document loads or constructs the program's data and constructs the windows to show it.

这是程序员控制程序行为的起点，文档载入或构建程序数据，并构建函待显示的窗口。

A common mistake is to think that your program doesn't have a "document" so you shouldn't model a document class. In reality, if a program does anything then it is changing some piece of data (a preference file, a set of objects for rendering in OpenGL, the result of a calculation). You should design your program with this piece of data as the document. Even if your program only has one window, even if it only works with the same piece of data, even if you aren't writing a "Cocoa Document-based Application"; you should always have a class at the heart of your program which can be called "the current document".

认为程序没有"文档"而不应把文档类模型化，这是一个常见的错误。实际上，程序只要干了活就会改变某些数据（比如偏好设置文件、OpenGL 中的渲染对象集合、计算的结果等等）。设计程序时应该跟文档一样考虑这些数据。你的程序即使只有一个窗口，即使以相同的数据运行，甚至你编写的不是"Cocoa 基于文档的应用程序"，心中都应该怀有这样一个类——你可以称之为"当前文档"。

### Window controllers 窗口控制器

A window controller is the class responsible for loading a window and putting it on screen. The window controller is responsible for giving context to the views and controls within the window, connecting them to data controllers which will provide them with data.

窗口控制器是负责把窗口载入屏幕的类，负责给窗口内的视图和控制器提供上下文，连接到提供数据的数据控制器上。

It is common for window controllers to double as data controllers for some functions since the window controller knows the state required to make the connection. This is not a bad thing in itself but should be resisted in the long term since it leads to bloat in the window controller (which often has a lot of work to do already). Generic, data-specific controllers should be used for this task.

窗口控制器在一些函数上比数据控制器多一倍，这种情况是常见的，因为它需要知道产生连接的状态。这不是什么坏事，但从长远来说应该要抵制，因为它会导致窗口控制器自身的膨胀（它早已排满了各种任务）。一般来说，应该使用特定数据的控制器完成这些任务。

### User Interface Elements 用户界面元素

Where possible, these should be generic elements: buttons, text display, image display. They end up performing specific actions when connected (through controllers) to their contextually supplied data.

可能的话，用户界面元素通常包括：按钮、文本显示和图片显示等。（通过控制器）连接相应的数据时，它们最终会执行指定的行为。

User interface elements are normally hierarchic. The screen contains windows; windows contain views; views contain subviews. One window is normally in front (main window) and one view within this window is normally the focus. The application's "event loop" will send keyboard actions, mouse events and menu selections to this focus object. Unhandled events get passed up through the hierarchy so that parents can handle events that their children don't handle.

用户界面元素通常是分级的。屏幕包含窗口；窗口包含视图；视图包含次级视图。窗口一般在最前（主窗口），这个窗口内视图一般也会聚焦。应用程序的"事件循环"会给这个聚焦的对象发送键盘键盘动作、鼠标事件和菜单选择等行为。未处理的事件可以跨越层级，所以父层能够处理子层未能处理的事件。

The handling of events should be managed as low in the hierarchy as possible. Again, consolidation in parents leads to bloat. Even "small" applications can become very big.

事件应该尽可能在低的层级上处理。父层事件的集中会导致应用程序的膨胀。就算是"小"的应用程序也能变得很大。

### Data Controllers 数据控制器

These should be as generic as possible. Their purpose should be to relay information from a source to a destination about data changes.

数据控制器应该尽可能通用化。它的目的应是分发从源到目标中关于数据变化的信息。

The simplest manifestation of a data controller is for a third-party to establish or enable the Observer design pattern between two objects.

数据控制器最普遍的表现是为第三方建立或启用两个对象之间的[观察者设计模式][1]。

The worst approach (sometimes called an anti-pattern) is an all encompassing arbiter object that receives every change request the program makes, performs the change and then updates everything that needs to be updated. This approach is unsustainable on an application-wide scale. Decomposition is key --- data controllers should have small, focussed scope.

最差劲的方法（有时被称为反模式）是使用一个包办一切的对象接收程序产生的一切变化请求，执行变化然后更新所有需要更新的东西。这种方法无法支撑应用程序级别的扩展性。分解才是关键——数据控制器应该是一个小型的、集中的范围。

## An example application 一个实例

Now we'll look quickly at what this means in an AppKit-based application. This application is a simple program that creates and edits lists of names. I know that's a pretty trivial thing for a program to do but the example must be simple so I can describe it here properly.

现在我们快速浏览一下它们在基于 AppKit 的应用程序中的含义。这是一个简单的应用程序，用以创建和编辑名字清单。我知道对程序来说这是在微不足道，但为了表述清晰才让它必须简单的。

![应用程序流程图](/assets/posts/2008_10_10/DetailedAppKitDesign.png)

> You can download the [project described in this diagram][2], although it isn't necessary to understand the discussion.
>
> 你可以下载[这张图所描述的应用程序][2]，尽管对理解这个讨论而言不是必要的。

The application object is an unmodified NSApplication. This will almost always be the case in any Cocoa Application. You can achieve most customisation of the NSApplication object through data (in the Info.plist file) or by attaching an application delegate object (which can intercept control at predetermined points). The application instance handles our startup, event loop and contruction of documents (I have discussed how a Cocoa application loads in a previous post).

这个应用程序对象是一个未经修改的 NSApplication, 在 Cocoa 应用程序中几乎都是这种情形。你可以通过数据（在 Info.plist 文件中）或附加一个应用程序代理对象（它可以侦听特定情况下的控制）实现 NSApplication 的大部分定制。这个应用程序实例处理我们的启动、事件循环和文档的构建（我在[前一篇 blog ][3]中讨论了 Cocoa 应用程序是如何载入的）。

This application doesn't have any preferences or significant data outside the scope of the document, so the "Application Controllers" section just has the Main Menu in it.

这个应用程序没有偏好设置，也没有超出文档的重要数据，所以"应用程序控制器"部分只有一个主菜单。

Documents in AppKit act as both a data controller for the data (in this case, an array of strings) and the window controller for the main document window. The document handles saving and reading to and from any file on disk. This could be done with basic NSKeyedArchiver methods to turn an array of strings into an NSData object for writing to disk. The window is loaded automatically from the window NIB file (specified in the program's Info.plist file).

AppKit 中的文档不仅作为数据（在这个例子中是字符串数组）的数据控制器，还充当主文档窗口的窗口控制器。这个文档还处理磁盘上文件的读写，是通过基本的 NSKeyedArchiver 方法把字符串数组转为可写入磁盘的 NSData 对象实现的，而窗口是从窗口 NIB 文件（在程序的 Info.plist 文件中指定）自动载入的。

The NIB file for the document contains an NSArrayController which is connected to the list of names from the document via the appropriate keyPath. This allows the NSArrayController to issue key value observing notifications when it changes the array and similarly allows it to update automatically when something else changes the array on the document.

文档的 NIB 文件含有一个 NSArrayController, 它通过合适的 keyPath 从文档连接到名字的清单。这让 NSArrayController 在改变数组的时候可以发出侦听键值的通知，或类似地在其它东西改变文档数组时也允许它自动更新。

The NIB file for the document also contains the window, which in turn contains an NSTableView. The NIB file specifies that the NSTableView's only column (displayed using the NSTextCell) should get its data from the NSArrayController. In this way, the table is updated to display the list of names contained in the document.

文档的 NIB 文件也含有依次包含 NSTableView 的窗口。NIB 文件规定 NSTableView 唯一的栏（使用 NSTextCell 来显示）应该从 NSArrayController 中获取数据。在这种情况下，文档内的表格作出更新以显示名字清单。

The NSTextCell displays the name for each row and allows editing. If an entry is changed in this way, notifications are sent back through the NSArrayController to the document.

NSTextCell 在每一行上显示名字，而且允许编辑。如果某个条目这种方式下改变，NSArrayController 会把通知发送给文档。

Similarly, the "Add New Name" button can add a new object by communicating with the NSArrayController, asking it to create a new object and insert it in the array, which triggers all relevant change.

类似地，"Add New Name" 按钮通过跟 NSArrayController 的通讯可以添加一个新对象，要求它创建并插入到数组中，这会触发所有相关变化的传播。

## Conclusion 总结

All of this may seem like a lot of work --- setting up connections and controllers and notifications. When starting a new program, you may think that many of these elements don't apply to you. Be careful --- don't chase false simplicity.

所有这些需要的工作量看起来很大——设置连接、控制器和通知。当开始一个新的程序，你可能认为这些元素的大部分都不适用。小心——不要追求失败的简洁性。

Remember, Cocoa was written to make the approach described in this article easier than the alternatives. Classes like NSArrayController and protocols like NSKeyValueObserving and NSKeyValueBindingCreation make connecting large amounts of data as simple as point and click in Interface Builder. In many cases, it ends up being faster than manually connecting a button or text field directly to a method on your document class.

记住，对于本文描述的各种方法，Cocoa 是本着更方便而非其他目的而生的。诸如 NSArrayController 等类、诸如 NSKeyValueObserving 和 NSKeyValueBindingCreation 等协议，让大量数据的连接跟 Interface Builder 中的指向和点击一样简单。

You will always have change behaviors that cannot be connected using these generic objects but following the same structural patterns that they use will keep your application clean and make it work better within Cocoa.

你总会碰到不能使用这些通用对象连接的变化行为，但遵循这些它们用到的相同结构模式会让你的应用程序更清晰，也能更好地运行在 Cocoa 下。

[0]: http://cocoawithlove.com/2008/08/application-design-in-appkit.html
[1]: http://cocoawithlove.com/2008/06/five-approaches-to-listening-observing.html
[2]: http://cocoawithlove.googlepages.com/NameListEditor.zip
[3]: http://cocoawithlove.com/2008/03/cocoa-application-startup.html
