// readThenDelete();

function readThenDelete() {
    query = new Parse.Query(Pet);
    query.equalTo("name", textName);
    query.first().then(function (pet) {
        if (pet) {
            console.log('Pet found with name: ' + pet.get("name") + ' and age: ' + pet.get("agePet"));
            deletePet(pet);
        } else {
            console.log("Nothing found, please try again");
            return null;
        }
    }).catch(function (error) {
        console.log("Error: " + error.code + " " + error.message);
        return null;
    });
}

function deletePet(foundPet) {
    foundPet.destroy().then(function(response) {
      console.log('Pet '+ foundPet.get("name") + ' erased successfully');
    }).catch(function(response, error) {
      console.log('Error: '+ error.message);
    });
}