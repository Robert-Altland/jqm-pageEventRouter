What it is
jqm-pageEventRouter is a utility component and guidance (through a sample project) that facilitates well structured JavaScript using a code-behind model familiar to ASP.NET server developers. It is intended for developers new to jQuery Mobile who are working on small to medium sized mobile web applications. It can also be used for simple PhoneGap applications written using jQuery and jQuery Mobile.

How it works
jqm-pageEventRouter uses a custom data-codebehind attribute to associate the current $.mobile.activePage with a dynamically created instance of a JavaScript code-behind class which extends a basePage class. The component subscribes to jQuery Mobile page events and dynamically routes them to the correct "event handler" methods in the active code-behind object. It caches the active code-behind object using jqmData() on $.mobile.activePage. When $.mobile.activePage changes, the code-behind object is removed. When you revisit a page, you get a new dynamically created instance of the code-behind class.

Required and optional dependencies
This sample is built using ASP.NET MVC 4, but will work with previous versions of MVC or WebForms. It requires jQuery 1.9.1 and jQuery Mobile 1.3.1. The unit tests require QUnit 1.3.0.

This sample uses TypeScript to provide type safety and inheritance, and uses type definition files to compile classes that use jQuery, jQuery Mobile and QUnit. TypeScript is not required to use this component. 

This sample also uses WebGrease and System.Web.Optimization for bundling and minification. These libraries are not required to use this component.

Work in progress
There are several areas throughout the code tagged with TODO: comments, indicating known inefficiencies, workarounds or just bad practices (ex: JavaScript eval). 
