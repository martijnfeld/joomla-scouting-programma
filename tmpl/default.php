<?php

defined('_JEXEC') or die;

$document = JFactory::getDocument();
$document->addScript(JURI::base() . 'modules/mod_websiteprogramma/js/script.js?v=3');
$tableId = 'mod_websiteprogramma-table-'.rand();


$document->addScriptDeclaration('
    document.addEventListener("DOMContentLoaded", function() {
        mod_websiteprogramma_buildTable('.json_encode($tableId).','.json_encode($params->get('json_url')).')
    });
');
$document->addStyleSheet(JURI::base() . 'modules/mod_websiteprogramma/css/style.css?v=3');

?>

<div class="mod_websiteprogramma-activiteiten" id="<?php echo $tableId; ?>">
	<div>Laden...</div>
</div>
