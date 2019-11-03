var repository = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 0.9, types: ["grass", "poison"] },
  { name: "Venusaur", height: 1.8, types: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Charmeleon", height: 0.9, types: ["fire"] },
  { name: "Charizard", height: 1.5, types: ["fire", "flying"] },
  { name: "Squirtle", height: 0.3, types: ["water"] },
  { name: "Wartortle", height: 0.9, types: ["water"] }
];

for (var i = 0; i < repository.length; i++) {
  var size;
  if (repository[i].height > 1) {
    size = "Wow, that's big!";
  } else {
    size = "not big";
  }

  var result;
  for (var typeItem = 0; typeItem < repository[i].types.length; typeItem++) {
    if (repository[i].types[typeItem] == "grass") {
      result = '<span style="color:green;"> ';
    } else if (repository[i].types[typeItem] == "fire") {
      result = '<span style="color:red;"> ';
    } else if (repository[i].types[typeItem] == "poison") {
      result = '<span style="color:purple;"> ';
    } else if (repository[i].types[typeItem] == "flying") {
      result = '<span style="color:brown;"> ';
    } else if (repository[i].types[typeItem] == "water") {
      result = '<span style="color:blue;"> ';
    }
  }

  document.write(
    '<div class="box">' +
      repository[i].name +
      "(height: " +
      repository[i].height +
      "m" +
      ")" +
      result +
      size +
      "<br>" +
      repository[i].types +
      "<br>" +
      "</div>"
  );
}
