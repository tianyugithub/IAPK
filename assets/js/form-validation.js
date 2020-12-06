/*=========================================================================================
	File Name: form-validation.js
	Description: jquery bootsreap validation js
	----------------------------------------------------------------------------------------
	Item Name: Apex - Responsive Admin Theme
	Version: 2.1
	Author: PIXINVENT
	Author URL: Author URL: http://bootstrapmb.com/muban/houtai
==========================================================================================*/

(function(window, document, $) {
	'use strict';

	// Input, Select, Textarea validations except submit button
	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation();

})(window, document, jQuery);