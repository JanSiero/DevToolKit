<?php
$manifest = array(
	'acceptable_sugar_versions' => array('5.0', '5.1', '5.2', '5.5'),
	'acceptable_sugar_flavors' => array('CE', 'PRO', 'ENT'),
	'readme' => '',
	'key' => 'ndops',
	'author' => 'André Lopes',
	'description' => 'Development Tool Kit',
	'icon' => '',
	'is_uninstallable' => true,
	'name' => 'DevToolKit',
	'published_date' => '2009-11-28 22:40:00',
	'type' => 'module',
	'version' => '0.7',
	'remove_tables' => 'prompt',
);
$installdefs = array(
	'id' => 'ndops_dtk',
	'copy' => array(
		array(
			'from' => '<basepath>/SugarModules/custom/include/javascript/DropdownFields.js',
			'to' => 'custom/include/javascript/DropdownFields.js',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/javascript/DynamicPanel.js',
			'to' => 'custom/include/javascript/DynamicPanel.js',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/javascript/EditableFields.js',
			'to' => 'custom/include/javascript/EditableFields.js',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/javascript/RequiredFields.js',
			'to' => 'custom/include/javascript/RequiredFields.js',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/javascript/VisibleFields.js',
			'to' => 'custom/include/javascript/VisibleFields.js',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit.php',
			'to' => 'custom/include/utils/DevToolKit.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKitManager.php',
			'to' => 'custom/include/utils/DevToolKitManager.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit/DuplicateFields.php',
			'to' => 'custom/include/utils/DevToolKit/DuplicateFields.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit/DynamicDropdown.php',
			'to' => 'custom/include/utils/DevToolKit/DynamicDropdown.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit/DynamicPanel.php',
			'to' => 'custom/include/utils/DevToolKit/DynamicPanel.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit/EditableFields.php',
			'to' => 'custom/include/utils/DevToolKit/EditableFields.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit/RequiredFields.php',
			'to' => 'custom/include/utils/DevToolKit/RequiredFields.php',
		),
		array(
			'from' => '<basepath>/SugarModules/custom/include/utils/DevToolKit/VisibleFields.php',
			'to' => 'custom/include/utils/DevToolKit/VisibleFields.php',
		),
	),
	'language' => array(
		array(
			'from'=> '<basepath>/SugarModules/language/application.en_us.lang.php',
			'to_module'=> 'application',
			'language'=>'en_us',
		),
		array(
			'from'=> '<basepath>/SugarModules/language/application.pt_br.lang.php',
			'to_module'=> 'application',
			'language'=>'pt_br',
		),
	),
);
?>
