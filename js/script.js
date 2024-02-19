function mod_websiteprogramma_buildTable(id, url, afbeelding) {
	var table = document.getElementById(id);
	// var tbody = table.getElementsByTagName('tbody')[0];

	// var kolommen = [
	// 	{
	// 		key: 'date',
	// 	},
	// 	{
	// 		key: 'name',
	// 	},
	// 	{
	// 		key: 'omschrijving',
	// 	},
	// ];
	fetch(url+'&_t='+new Date().getTime()).then(function(resp){return resp.json()}).then(function(programma) {
		// tbody.innerHTML = '';
		table.innerHTML = '';

		if(programma && programma.length > 0){
			var vorigeWeekDagNr = null;
			var showWeekDay = programma.some(function (item) {
				var itemWeekDag = new Date(item.date).getDay();
				if(vorigeWeekDagNr === null){
					vorigeWeekDagNr = itemWeekDag;
				}
				return vorigeWeekDagNr != itemWeekDag;
			});

			programma.forEach(function (item) {
				table.innerHTML += getProgrammaRow(item, showWeekDay);
				// var row = tbody.insertRow();
				// kolommen.forEach(function (col) {
				// 	var cell = row.insertCell();
				// 	var text = item[col.key];
				// 	if(text && col.key == 'date'){
				// 		text = new Date(text).toLocaleDateString(undefined, { dateStyle:'medium' })
				// 	}
				// 	if(col.key == 'omschrijving'){
				// 		cell.innerHTML = text;
				// 	}
				// 	else{
				// 		var textNode = document.createTextNode(text);
				// 		cell.appendChild(textNode);
				// 	}
				// });
			})
		}
	}).catch(err => {
		var row = tbody.insertRow();
		var cell = row.insertCell();
		var textNode = document.createTextNode('Error while loading');
		cell.appendChild(textNode);
		console.error(err);
	})
}
function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
function getProgrammaRow(item, showWeekDay){
	var retval = '';
	retval += "<div class='mod_websiteprogramma-activiteit'>";
	retval += "	<div class='mod_websiteprogramma-info'>";
	retval += "		<div class='mod_websiteprogramma-info-date'>";
	// retval += escapeHtml(new Date(item.date).toLocaleDateString(undefined, { dateStyle:'medium' }));
	retval += escapeHtml(new Date(item.date).toLocaleDateString(undefined, { weekday: showWeekDay ? 'short' : undefined, year: '2-digit', month: 'short', day: 'numeric' }));
	retval += "		</div>";
	if(!!item.image_url){
		retval += "		<div class='mod_websiteprogramma-info-img'>";
		retval += "			<img src='"+escapeHtml(item.image_url)+"'  loading='lazy'  />";
		retval += "		</div>";
	}
	retval += "	</div>";
	retval += "	<div class='mod_websiteprogramma-omschrijving'>";
	retval += "		<div class='mod_websiteprogramma-title'>"+escapeHtml(item.name)+"</div>";
	var omschrijving = item.omschrijving || '';
	if(omschrijving.replaceAll('<br>', '').replaceAll('<p>', '').replaceAll('</p>', '').trim() != ''){
		retval += "		<div class='mod_websiteprogramma-toelichting'>"+omschrijving+"</div>";
	}
	retval += "	</div>";
	retval += "</div>";

	return retval;
}
