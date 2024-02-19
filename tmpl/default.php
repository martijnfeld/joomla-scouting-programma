<?php

defined('_JEXEC') or die;

$document = JFactory::getDocument();
$document->addScript(JURI::base() . 'modules/mod_websiteprogramma/js/script.js', array('version'=>'auto'));
$tableId = 'mod_websiteprogramma-table-'.rand();


$document->addScriptDeclaration('
    document.addEventListener("DOMContentLoaded", function() {
        mod_websiteprogramma_buildTable('.json_encode($tableId).','.json_encode($params->get('json_url')).')
    });
');
$document->addStyleSheet(JURI::base() . 'modules/mod_websiteprogramma/css/style.css', array('version'=>'auto'));

?>

<div class="mod_websiteprogramma-activiteiten" id="<?php echo $tableId; ?>">
	<div>Laden...</div>
</div>
