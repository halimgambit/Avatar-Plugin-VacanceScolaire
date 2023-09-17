exports.action = function(data, callback){

	var tblCommand = {
		zoneA : function() {
			scolaire("zone-a", data, client);
		},
		zoneB : function() {
			scolaire("zone-b", data, client);
		},
		zoneC : function() {
			scolaire("zone-c", data, client);
		}				
	};

function scolaire (vacance, data, client, $) {

	Avatar.speak("Attend, je regarde", data.client, () => {
	const cheerio = require("cheerio");
	fetch(`https://www.vacances-scolaires-education.fr/vacances-${vacance}.html`)
	  .then(response => {
		  if (response.status !== 200) {
			  throw new Error(`La connexion à échoué`);
			}
		  return response.text();
	  })
	  .then((body) => {
	   $ = cheerio.load(body);
	   if (vacance === zoneVa) {
		  const aZone = $('body > div.container > main > article > section:nth-child(2) > div:nth-child(2)').text();
		  Avatar.speak(`Voici les vacances ${aZone}`, data.client, () => {
			  Avatar.Speech.end(data.client);
		  });
		}
		else if (vacance === zoneVb) {
		  const bZone = $('body > div.container > main > article > section:nth-child(2) > div:nth-child(2)').text();
		  Avatar.speak(`Voici les vacances scolaire ${bZone}`, data.client, () => {
			  Avatar.Speech.end(data.client);
		  });
		}
		else if (vacance === zoneVc) {
			const cZone = $('body > div.container > main > article > section:nth-child(2) > div:nth-child(2)').text();
			Avatar.speak(`Voici les vacances scolaire ${cZone}`, data.client, () => {
				Avatar.Speech.end(data.client);
			});
		  }
	})
	  .catch (error => {
		Avatar.speak(`Je n'arrive pas a accédé au site, ${error}`, data.client, () => {
		  Avatar.Speech.end(data.client);
		});
	  });
	});
}

let client = setClient(data);
	info("VacanceScolaire:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}


function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
