var gale = new Array();
var gale_in_force = new Array();
var galeIssueTime = new Array();
var shipIssueTime = new Array();
var wind = new Array();
var weather = new Array();
var visibility = new Array();
var seastate = new Array();
var area = new Array();
var area_presentation = new Array();
var key = new Array();


// Fisher
gale_in_force[9] = "1";
gale[9] = "Southwesterly gale force 8 expected soon";
galeIssueTime[9] = "2139 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Mon 27 Oct";
shipIssueTime[9] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[9] = "Southwest 5 to 7, occasionally gale 8, veering northwest 5 or 6.";
weather[9] = "Rain then fair.";
visibility[9] = "Good, occasionally poor.";
seastate[9] = "Moderate or rough.";
area[9] = "Fisher";
area_presentation[9] = "Fisher";
key[9] = "Fisher";

// Bailey
gale_in_force[28] = "0";
gale[28] = "0";
galeIssueTime[28] = "";
shipIssueTime[28] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[28] = "Westerly or northwesterly 5 or 6, occasionally 7 at first, becoming variable 4 later.";
weather[28] = "Squally showers.";
visibility[28] = "Moderate or good.";
seastate[28] = "Rough, occasionally very rough.";
area[28] = "Bailey";
area_presentation[28] = "Bailey";
key[28] = "Bailey";

// Lundy
gale_in_force[21] = "0";
gale[21] = "0";
galeIssueTime[21] = "";
shipIssueTime[21] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[21] = "Southwest veering northeast, 5 or 6.";
weather[21] = "Rain at times.";
visibility[21] = "Good, occasionally poor.";
seastate[21] = "Moderate or rough.";
area[21] = "Lundy";
area_presentation[21] = "Lundy";
key[21] = "Lundy";

// Portland
gale_in_force[15] = "0";
gale[15] = "0";
galeIssueTime[15] = "";
shipIssueTime[15] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[15] = "Southerly or southwesterly 4 or 5, occasionally 6 at first.";
weather[15] = "Rain later, fog patches.";
visibility[15] = "Moderate or good, occasionally very poor.";
seastate[15] = "Slight or moderate.";
area[15] = "Portland";
area_presentation[15] = "Portland";
key[15] = "Portland";

// North Utsire
gale_in_force[2] = "0";
gale[2] = "0";
galeIssueTime[2] = "";
shipIssueTime[2] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[2] = "Southwesterly 6 to gale 8, veering westerly or northwesterly 5 to 7.";
weather[2] = "Rain then showers.";
visibility[2] = "Good, occasionally poor.";
seastate[2] = "Moderate or rough, occasionally very rough for a time.";
area[2] = "North Utsire";
area_presentation[2] = "North Utsire";
key[2] = "NorthUtsire";

// FitzRoy
gale_in_force[19] = "0";
gale[19] = "0";
galeIssueTime[19] = "";
shipIssueTime[19] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[19] = "Cyclonic, but mainly southerly in east, 4 or 5, occasionally 6 at first.";
weather[19] = "Thundery showers.";
visibility[19] = "Good, occasionally poor.";
seastate[19] = "Moderate or rough.";
area[19] = "Fitzroy";
area_presentation[19] = "FitzRoy";
key[19] = "Fitzroy";

// Cromarty
gale_in_force[5] = "0";
gale[5] = "0";
galeIssueTime[5] = "";
shipIssueTime[5] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[5] = "West or northwest 5 to 7, decreasing 4 later.";
weather[5] = "Showers.";
visibility[5] = "Good.";
seastate[5] = "Moderate or rough.";
area[5] = "Cromarty";
area_presentation[5] = "Cromarty";
key[5] = "Cromarty";

// Shannon
gale_in_force[24] = "0";
gale[24] = "0";
galeIssueTime[24] = "";
shipIssueTime[24] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[24] = "Northerly veering southeasterly 5 or 6.";
weather[24] = "Rain.";
visibility[24] = "Good, occasionally poor.";
seastate[24] = "Rough.";
area[24] = "Shannon";
area_presentation[24] = "Shannon";
key[24] = "Shannon";

// Dover
gale_in_force[13] = "0";
gale[13] = "0";
galeIssueTime[13] = "";
shipIssueTime[13] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[13] = "Southerly or southwesterly 4 or 5, occasionally 6 at first, veering northeasterly 4 later in north.";
weather[13] = "Rain later.";
visibility[13] = "Moderate or good.";
seastate[13] = "Slight or moderate.";
area[13] = "Dover";
area_presentation[13] = "Dover";
key[13] = "Dover";

// South Utsire
gale_in_force[3] = "0";
gale[3] = "0";
galeIssueTime[3] = "";
shipIssueTime[3] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[3] = "Southwesterly 6 to gale 8, veering westerly or northwesterly 5 to 7.";
weather[3] = "Rain then showers.";
visibility[3] = "Good, occasionally poor.";
seastate[3] = "Moderate or rough, occasionally very rough for a time.";
area[3] = "South Utsire";
area_presentation[3] = "South Utsire";
key[3] = "SouthUtsire";

// Fair Isle
gale_in_force[29] = "0";
gale[29] = "0";
galeIssueTime[29] = "";
shipIssueTime[29] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[29] = "Westerly or northwesterly 5 to 7, decreasing 4 in southwest later.";
weather[29] = "Squally showers.";
visibility[29] = "Moderate or good.";
seastate[29] = "Rough.";
area[29] = "Fair Isle";
area_presentation[29] = "Fair Isle";
key[29] = "FairIsle";

// Biscay
gale_in_force[17] = "0";
gale[17] = "0";
galeIssueTime[17] = "";
shipIssueTime[17] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[17] = "Southerly or southeasterly 4 or 5, becoming variable 3 for a time.";
weather[17] = "Showers.";
visibility[17] = "Moderate or good.";
seastate[17] = "Moderate, occasionally rough at first.";
area[17] = "Biscay";
area_presentation[17] = "Biscay";
key[17] = "Biscay";

// Hebrides
gale_in_force[27] = "0";
gale[27] = "0";
galeIssueTime[27] = "";
shipIssueTime[27] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[27] = "Westerly or northwesterly 5 or 6, occasionally 7 at first, becoming variable 4 later.";
weather[27] = "Squally showers.";
visibility[27] = "Moderate or good.";
seastate[27] = "Rough.";
area[27] = "Hebrides";
area_presentation[27] = "Hebrides";
key[27] = "Hebrides";

// Trafalgar
gale_in_force[18] = "1";
gale[18] = "Easterly gale force 8 expected soon";
galeIssueTime[18] = "2139 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Mon 27 Oct";
shipIssueTime[18] = "2315 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Mon 27 Oct";
wind[18] = "In east easterly or southeasterly 5 to 7, occasionally gale 8 in far southeast, in west cyclonic 4 or 5.";
weather[18] = "Thundery showers.";
visibility[18] = "Good occasionally poor.";
seastate[18] = "Moderate or rough.";
area[18] = "Trafalgar";
area_presentation[18] = "Trafalgar";
key[18] = "Trafalgar";

// Dogger
gale_in_force[8] = "0";
gale[8] = "0";
galeIssueTime[8] = "";
shipIssueTime[8] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[8] = "Southwest 5 to 7, veering northwest 5 or 6, decreasing 4 later.";
weather[8] = "Rain then fair.";
visibility[8] = "Good, occasionally poor.";
seastate[8] = "Moderate or rough.";
area[8] = "Dogger";
area_presentation[8] = "Dogger";
key[8] = "Dogger";

// South-east Iceland
gale_in_force[31] = "0";
gale[31] = "0";
galeIssueTime[31] = "";
shipIssueTime[31] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[31] = "Northerly 5 to 7, veering easterly 5 or 6 in west later.";
weather[31] = "Rain or showers.";
visibility[31] = "Moderate or good.";
seastate[31] = "Moderate or rough, occasionally very rough in east.";
area[31] = "Southeast Iceland";
area_presentation[31] = "South-east Iceland";
key[31] = "SoutheastIceland";

// Malin
gale_in_force[26] = "0";
gale[26] = "0";
galeIssueTime[26] = "";
shipIssueTime[26] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[26] = "Westerly or northwesterly 5 or 6, becoming variable 4 later.";
weather[26] = "Squally showers.";
visibility[26] = "Moderate or good.";
seastate[26] = "Rough.";
area[26] = "Malin";
area_presentation[26] = "Malin";
key[26] = "Malin";

// Sole
gale_in_force[20] = "0";
gale[20] = "0";
galeIssueTime[20] = "";
shipIssueTime[20] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[20] = "Cyclonic, but mainly southerly in east, 4 or 5, occasionally 6 at first.";
weather[20] = "Thundery showers.";
visibility[20] = "Good, occasionally poor.";
seastate[20] = "Moderate or rough.";
area[20] = "Sole";
area_presentation[20] = "Sole";
key[20] = "Sole";

// Forties
gale_in_force[4] = "0";
gale[4] = "0";
galeIssueTime[4] = "";
shipIssueTime[4] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[4] = "Southwesterly 6 to gale 8, veering westerly or northwesterly 5 to 7.";
weather[4] = "Rain then showers.";
visibility[4] = "Good, occasionally poor.";
seastate[4] = "Moderate or rough, occasionally very rough for a time.";
area[4] = "Forties";
area_presentation[4] = "Forties";
key[4] = "Forties";

// Humber
gale_in_force[11] = "0";
gale[11] = "0";
galeIssueTime[11] = "";
shipIssueTime[11] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[11] = "Southwesterly 5 or 6, veering northeasterly 4 or 5.";
weather[11] = "Rain later.";
visibility[11] = "Good, occasionally poor later.";
seastate[11] = "Moderate.";
area[11] = "Humber";
area_presentation[11] = "Humber";
key[11] = "Humber";

// Plymouth
gale_in_force[16] = "0";
gale[16] = "0";
galeIssueTime[16] = "";
shipIssueTime[16] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[16] = "Southerly or southwesterly 4 or 5, occasionally 6 at first.";
weather[16] = "Rain later, fog patches.";
visibility[16] = "Moderate or good, occasionally very poor.";
seastate[16] = "Slight or moderate, occasionally rough at first.";
area[16] = "Plymouth";
area_presentation[16] = "Plymouth";
key[16] = "Plymouth";

// Thames
gale_in_force[12] = "0";
gale[12] = "0";
galeIssueTime[12] = "";
shipIssueTime[12] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[12] = "Southwesterly 5 or 6, veering northeasterly 4 or 5.";
weather[12] = "Rain later.";
visibility[12] = "Good, occasionally poor later.";
seastate[12] = "Moderate.";
area[12] = "Thames";
area_presentation[12] = "Thames";
key[12] = "Thames";

// Wight
gale_in_force[14] = "0";
gale[14] = "0";
galeIssueTime[14] = "";
shipIssueTime[14] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[14] = "Southerly or southwesterly 4 or 5, occasionally 6 at first.";
weather[14] = "Rain later.";
visibility[14] = "Moderate or good.";
seastate[14] = "Slight or moderate.";
area[14] = "Wight";
area_presentation[14] = "Wight";
key[14] = "Wight";

// Fastnet
gale_in_force[22] = "0";
gale[22] = "0";
galeIssueTime[22] = "";
shipIssueTime[22] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[22] = "Southwest veering northeast, 5 or 6.";
weather[22] = "Rain at times.";
visibility[22] = "Good, occasionally poor.";
seastate[22] = "Moderate or rough.";
area[22] = "Fastnet";
area_presentation[22] = "Fastnet";
key[22] = "Fastnet";

// German Bight
gale_in_force[10] = "0";
gale[10] = "0";
galeIssueTime[10] = "";
shipIssueTime[10] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[10] = "Southwest 5 to 7, veering northwest 5 or 6, decreasing 4 later.";
weather[10] = "Rain then fair.";
visibility[10] = "Good, occasionally poor.";
seastate[10] = "Moderate or rough.";
area[10] = "German Bight";
area_presentation[10] = "German Bight";
key[10] = "GermanBight";

// Forth
gale_in_force[6] = "0";
gale[6] = "0";
galeIssueTime[6] = "";
shipIssueTime[6] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[6] = "Southwest 5 to 7, occasionally gale 8, veering northwest 5 or 6, decreasing 4 later.";
weather[6] = "Rain then fair.";
visibility[6] = "Good, occasionally poor.";
seastate[6] = "Moderate or rough, becoming slight.";
area[6] = "Forth";
area_presentation[6] = "Forth";
key[6] = "Forth";

// Tyne
gale_in_force[7] = "0";
gale[7] = "0";
galeIssueTime[7] = "";
shipIssueTime[7] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[7] = "Southwest 5 to 7, veering northwest 5 or 6, decreasing 4 later.";
weather[7] = "Rain then fair.";
visibility[7] = "Good, occasionally poor.";
seastate[7] = "Moderate or rough, becoming slight.";
area[7] = "Tyne";
area_presentation[7] = "Tyne";
key[7] = "Tyne";

// Faeroes
gale_in_force[30] = "0";
gale[30] = "0";
galeIssueTime[30] = "";
shipIssueTime[30] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[30] = "Westerly or northwesterly 5 to 7, decreasing 4 in southwest later.";
weather[30] = "Squally showers.";
visibility[30] = "Moderate or good.";
seastate[30] = "Rough.";
area[30] = "Faeroes";
area_presentation[30] = "Faeroes";
key[30] = "Faeroes";

// Irish Sea
gale_in_force[23] = "0";
gale[23] = "0";
galeIssueTime[23] = "";
shipIssueTime[23] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[23] = "Southwest 6 to gale 8 veering northwest 5 or 6, then east 4 or 5 later.";
weather[23] = "Rain then fair.";
visibility[23] = "Good, occasionally poor at first.";
seastate[23] = "Moderate or rough, but becoming slight in northeast later.";
area[23] = "Irish Sea";
area_presentation[23] = "Irish Sea";
key[23] = "IrishSea";

// Viking
gale_in_force[1] = "0";
gale[1] = "0";
galeIssueTime[1] = "";
shipIssueTime[1] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[1] = "Southwesterly 7 or gale 8 in southeast at first, otherwise westerly or northwesterly 5 or 6.";
weather[1] = "Rain then showers.";
visibility[1] = "Moderate or good.";
seastate[1] = "Very rough at first in southeast, otherwise moderate or rough.";
area[1] = "Viking";
area_presentation[1] = "Viking";
key[1] = "Viking";

// Rockall
gale_in_force[25] = "0";
gale[25] = "0";
galeIssueTime[25] = "";
shipIssueTime[25] = "1030 <acronym title='Coordinated Universal Time (UTC)'> UTC</acronym> Tue 28 Oct";
wind[25] = "In south, northerly veering southeasterly 5 or 6.  In north, westerly or northwesterly 5 or 6, occasionally 7 at first, becoming variable 4 later.";
weather[25] = "In south, rain, becoming fair.  In north, squally showers.";
visibility[25] = "In south, good, occasionally poor.  In north, moderate or good.";
seastate[25] = "Rough.";
area[25] = "Rockall";
area_presentation[25] = "Rockall";
key[25] = "Rockall";

// All Areas
gale_in_force[0] = "0";
gale[0] = "";
galeIssueTime[0] = "";
shipIssueTime[0] = "";
wind[0] = "";
weather[0] = "";
visibility[0] = "";
seastate[0] = "";
area[0] = "All Areas";
area_presentation[0] = "All Areas";
key[0] = "All";
		
