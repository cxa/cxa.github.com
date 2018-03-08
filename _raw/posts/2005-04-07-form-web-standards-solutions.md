---
title: 表单的Web标准解决方案
---
进入[eYou.com][0]后，马上就给新版的邮件界面转化成XHTML+CSS的工作，还好平时基本功还够扎实，有条不紊的干了下来。当然会遇到新的问题，比如，平时做网页，因为没有跟程序打过什么交道，较少使用表单。还好，世界还有Google，让我可以轻松应对新挑战。一些经验，写出来大家分享。

基于易用性（accesibility）的考虑，表单的标准写法应该在`<form>`和`</form>`之中包含`fieldset`和`legend`（说明），让用户明白该表单域的内容概要。简单的结构如下：

    <form>
     <fieldset>
       <legend></legend>
       ……
      </fieldset>
    </form>

在某些场合或许你不愿意让也许`fieldset`和`legend`影响你的设计方案中的美观，好办，在CSS中把`fieldset`的`border`设置为`0`，`legend`的`display`设置为` none`就行了。

在绝大多数情况下，表单的布局分两列，左边是标记（`label`），右边是输入框(`input type="text"...`)。如此简单的两列布局，我强烈建议不要使用表格。参考[http://stylephreak.frogrun.com/uploads/source/cssform.php][1]和[http://www.aplus.co.yu/css/forms/?css=1][2]（绝对有价值的两个参考，你已经可以不必往下看了），我们发现，Web标准通用的解决方法是，为`label`和`input type="text"...`的外围加上一个`div`，并把把该`div`的`display`设置为`block`。把`label`设为`float: left;`（这也是要把`div`设置为`display: block;`的原因）之后就可以让标记跟输入框同一行上了。让`label` 对齐的一个小窍门是，固定label的宽度，然后根据需要使用`text-align`向左或者向右对齐。设定宽度的小窍门是，使用单位`em`根据标记的最大字数来定宽度，不必辛苦测试`px`。

为了使我的阐述更容易理解，我简单写些代码：

**XHTML**：（部分）

    <form>
    	<fieldset>
    	<legend>表单实例</lengend>
    		<div><label for="name">姓名：</label><input type="text" id="name" /></div>
    		<div><label for="etc">其他等等：</label><input type="text" id="etc" /></div>
    		<div class="submit"><input type="submit" value="提交" /></div>
    	</fieldset>
    </form>

**CSS**：（部分）

    		body {/*跟表单无关，设置页面的显示效果*/
    			width: 400px;
    			margin: 20px auto;
    			font: 14px/1.5 Serif;
    			}
    		fieldset {
    			border: none;
    			border-top: 1px solid #ccc;
    			}
    		legend {
    			padding: 2px;
    			border: 1px solid #ddd;
    			background: #ececed;
    			}
    		div {
    			display: block;
    			padding: 5px 0;
    			}
    		label {
    			float: left;
    			width: 6em;
    			text-align: right;
    			}
    		.submit {
    			margin-left: 6em;
    			}
    		.submit input {
    			padding: 2px;
    			border: 1px solid #ccc;
    			background: #ececec;
    			}

查看效果（已失链）。这只是一个极其简单的例子，你完全可以根据这样的思路来做出各种复杂的效果。我上面列举的两个连接本身就是极好的演示。

[0]: http://dev.eyou.com
[1]: http://stylephreak.frogrun.com/uploads/source/cssform.php
[2]: http://www.aplus.co.yu/css/forms/?css=1
