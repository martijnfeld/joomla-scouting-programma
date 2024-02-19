<?php
defined('_JEXEC') or die;

JLoader::register('ContactHelperRoute', JPATH_SITE . '/components/com_contact/helpers/route.php');

class ModWebsiteprogrammaHelper
{

  public static function getContacts($params)
  {

    $db = JFactory::getDbo();


    $order = $params->get('order');

    $catIds = $params->get('catid');


    $query = $db->getQuery(true)
                ->select(array('contacts.*', 'categories.title'))
                ->from($db->quoteName('#__contact_details', 'contacts'))
    						->join('INNER', $db->quoteName('#__categories', 'categories') . ' ON ' . $db->quoteName('contacts.catId') . ' = ' . $db->quoteName('categories.id'))
                ->where("contacts.published='1'")
                ->where("categories.published='1'");
		if(!empty($catIds)){
			$query->where("contacts.catid IN (".join(',',$catIds).")");
		}
    $query->order("categories.title");
    $query->order($order);

    $db->setQuery($query);

    $contacts = $db->loadObjectList();

		// Sorteer en groeppeer op categorie
		$retval = array();
		$contactCatIndex = array();
		foreach ($contacts as $contact) {
			if(!isset($contactCatIndex[$contact->catid])){
				$contactCatIndex[$contact->catid] = array_push($retval, array(
					'cat' => $contact->title,
					'contacts' => array()
				)) - 1;
			}
			array_push($retval[$contactCatIndex[$contact->catid]]['contacts'], $contact);
		}

    return $retval;
  }

}
