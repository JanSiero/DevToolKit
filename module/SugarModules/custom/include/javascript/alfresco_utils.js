function setQsFields(qsField) {
	sqs_objects[qsField] = {
		"method" : "query",
		"modules" : ["lgs_Products"],
		"group" : "and",
		"field_list" : [
			"name",
			"name",
			"id",
			"description",
			"currency_id",
			"amount",
		],
		"populate_list" : [
			"name",
			"lgs_products_lgs_lineitems_name",
			"lgs_produca82croducts_ida",
			"description",
			"currency_id",
			"base_price",
		],
		"conditions" : [
			{"name" : "name", "op" : "like_custom", "end" : "%", "value" : ""}
		],
		"order" : "name",
		"limit" : "30",
		"no_match_text" : SUGAR.language.get("app_strings", "ERR_SQS_NO_MATCH"),
		"post_onblur_function" : "callTooglePanel"
	};

	customEnableQS(qsField);

	var button = document.EditView.btn_clr_lgs_products_lgs_lineitems_name;
	var seek = new RegExp("togglePanel");

	togglePanel(document.getElementById(qsField));
	updateDataGrid();

	if(! seek.test(button.attributes['onclick'].value)) {
		button.attributes['onclick'].value = button.attributes['onclick'].value + "togglePanel(getElementById('" + qsField + "'));document.EditView.name.value='';"
	}
}

function callbackJSONLineItemsAttrs(response) {
	store.loadData(Ext.decode(response.responseText));
}

function callTooglePanel(sqs_object, sqs_object_id) {
	togglePanel(document.getElementById(sqs_object_id));
	updateDataGrid();
}

function customEnableQS(theField) {
	var qsFields = Ext.query('.sqsEnabled');

	for(var qsField in qsFields) {
		if(qsFields[qsField].id == theField) {
			if (typeof QSFieldsArray[qsFields[qsField].id] != 'undefined') {
				Ext.getCmp('combobox_'+qsFields[qsField].id).destroy();
				var parent = QSFieldsArray[qsFields[qsField].id][0];

				if(typeof QSFieldsArray[qsFields[qsField].id][1] != 'undefined') {
					var nextSib = QSFieldsArray[qsFields[qsField].id][1];
					parent.insertBefore(QSFieldsArray[qsFields[qsField].id][2], nextSib);
				} else {
					parent.appendchild(QSFieldsArray[qsFields[qsField].id][2]);
				}
			}
			if(isInteger(qsField) && (qsFields[qsField].id && !document.getElementById(qsFields[qsField].id).readOnly) && typeof sqs_objects != 'undefined' && sqs_objects[qsFields[qsField].id] && sqs_objects[qsFields[qsField].id]['disable'] != true) {
				if(typeof QSFieldsArray[qsFields[qsField].id] == 'undefined') {
					var Arr = new Array(qsFields[qsField].parentNode, qsFields[qsField].nextSibling, qsFields[qsField]);
					QSFieldsArray[qsFields[qsField].id] = Arr;
				}
		
				var sqs = sqs_objects[qsFields[qsField].id];
				var display_field = sqs.field_list[0];
				var ds = new Ext.data.Store({
					storeId: "store_" + qsFields[qsField].id,
					proxy: new Ext.data.HttpProxy({
						url: 'index.php'
					}),
					remoteSort: true,
					reader: new Ext.data.JsonReader({
						root: 'fields',
						totalProperty: 'totalCount',
						id: 'id'
					}, [{
						name: display_field
					}, ]),
					baseParams: {
						to_pdf: 'true',
						module: 'Home',
						action: 'quicksearchQuery',
						data: Ext.util.JSON.encode(sqs)
					}
				});
				var search = new Ext.form.ComboBox({
					id: "combobox_" + qsFields[qsField].id,
					store: ds,
					//lazyRender: true,
					queryDelay: 700,// delay before starting the search
					maxHeight: 100,// max height of the drop and down
					minListWidth: 120,//The minimum width of the dropdown list in pixels
					displayField: display_field,
					fieldClass: '',
					listClsClass: typeof(Ext.version) != 'undefined' ? 'x-sqs-list' : 'x-combo-list',
					focusClass: '',
					disabledClass: '',
					emptyClass: '',
					invalidClass: '',
					selectedClass: typeof(Ext.version) != 'undefined' ? 'x-sqs-selected' : 'x-combo-list',
					typeAhead: true,// Autofill if only one match
					loadingText: SUGAR.language.get('app_strings', 'LBL_SEARCHING'),
					valueNotFoundText: sqs.no_match_text,
					hideTrigger: true,
					confirmed: false,
					applyTo: typeof(Ext.version) != 'undefined' ? qsFields[qsField].id : Ext.form.ComboBox.prototype.applyTo,
					minChars: 1,//1 character needed to start the search
					listeners: {
						select: function(el, type) {
							Ext.EventObject.preventDefault();
							Ext.EventObject.stopPropagation();
							setFields(type, el, /\S/);
							
							//Handle special case where post_onblur_function is set
							if(typeof(sqs_objects[el.el.id]['post_onblur_function']) != 'undefined') {
								collection_extended = new Array();
								for (var field in type.json) {
									for (var key in sqs_objects[el.el.id].field_list) {
										if (field == sqs_objects[el.el.id].field_list[key]) {
										collection_extended[sqs_objects[el.el.id].field_list[key]] = type.json[field];
										}
									}
								}
								eval(sqs_objects[el.el.id]['post_onblur_function'] + '(collection_extended, el.el.id)');
							}
						},
						autofill: function(el, ev) {
							el.lastQuery = "";
							el.doQuery(el.getRawValue());
							el.store.on("load", function() {
								if(el.confirmed) {
									el.confirmed = false;
								} else if (el.store.data.items != 'undefined' && el.store.data.items[0]) {
									el.setRawValue(el.store.data.items[0].json[this.displayField]);
									setAll(el, this, /\S/);
								} else {
									if(sqs_objects[el.el.id].populate_list.indexOf('account_id') != -1) {
										var selected = clearFields(sqs_objects[el.el.id], /account/);
									} else {
										var selected = clearFields(sqs_objects[el.el.id], /\S/);
									}
								}
								el.confirmed = false;
							}, this, {
								single: true
							});
						},
						blur: function(el) {
							togglePanel(document.getElementById(theField));
							var selected = false;
							selected = setAll(el, this, /\S/);
			
							if (el.getRawValue() == "") {
								selected = clearFields(sqs_objects[el.el.id], /\S/);
							}
							if (!selected) {
								el.fireEvent("autofill", el); 
							}
						}
					}
				});
				search.wrap.applyStyles('display:inline');
				qsFields[qsField].className = qsFields[qsField].className.replace('x-form-text', '');
				
				//For Mac + Firefox
				if(Ext.isMac && Ext.isGecko) {
					document.getElementById(qsFields[qsField].id).addEventListener('keypress', preventDef, false);
				}
			}
		}
	}
}

function set_return_alfresco(popup_reply_data) {
	set_return(popup_reply_data);
	setQsFields('lgs_products_lgs_lineitems_name');
	document.getElementById('name').value = document.getElementById('lgs_products_lgs_lineitems_name').value;
	updateDataGrid();
}

function updateDataGrid() {
	var product_id = document.getElementById('lgs_produca82croducts_ida').value;
	var record = document.EditView.record.value;

	if(product_id) {
		YAHOO.util.Connect.asyncRequest("GET", "index.php?to_csv=1&module=lgs_Products&action=GetAttributesAsJSON&record=" + record  + "&product_id=" + product_id, { success: callbackJSONLineItemsAttrs });
	}
}
