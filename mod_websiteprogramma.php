<?php
defined('_JEXEC') or die;


// Include the Contacts List functions only once
// JLoader::register('ModWebsiteprogrammaHelper', __DIR__ . '/helper.php');


// Load the default view
require JModuleHelper::getLayoutPath('mod_websiteprogramma', $params->get('layout', 'default'));
