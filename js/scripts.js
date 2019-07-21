var rickmortyRepo = (function() {
    var repository = [];
    var apiUrl = 'https://rickandmortyapi.com/api/character/'

    function loadList() {
        return $.ajax(apiUrl)
            .then (function(response) {
                response.results.forEach(function(item) {
                    var character = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                        add(character);
                });
            })
                .catch(function(e) {
                    console.error(e);
                });
    } /* feth and data_____________________________________*/

    function addListItem(character) {
        var $rickmortyLi = $('<li>');
        var $rickmortyButton = $('<button class = "button-style">' + character.name + '</button>');
        $rickmortyButton.on('click', function() {
            showDetails(character);
        });
        $('.characters-list').append($rickmortyLi);
        $rickmortyLi.append($rickmortyButton);
    } /* buttons within ul_______________________________ */

    function showDetails(item) {
        rickmortyRepo.loadDetails(item).then(function () {
            showModal(item);
        });
    }   /* Click and log! */

    function add(item) {
        repository.push(item);
    }
    
    function getAll() {
        return repository;
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return $.ajax(url)
            .then (function(response) {
                item.imageUrl = response.image;
                item.status = response.status;
                item.species = response.species;
            }).catch(function(e) {
                console.error(e);
            });
    } /* features of the item_________________*/

    function showModal(item) {
        var $modalContainer = $('#modal-container');
        $modalContainer.text('');

        var $modal = $('<div class = "modal">');

        var $closeButtonElement = $('<button class = "modal-close"> close </button>');
        $closeButtonElement.on('click', hideModal);

        var $nameElement = $('<h1>' + item.name + '</h1>');

        var $imageElement = $('<img class = "modal-img">');
        $imageElement.attr('src', item.imageUrl);

        var $statusElement = $('<p>' + item.status + '</p>');

        var $speciesElement = $('<p>' + item.species + '</p>');

        $modal.append($closeButtonElement);
        $modal.append($nameElement);
        $modal.append($imageElement);
        $modal.append($statusElement);
        $modal.append($speciesElement);
        $modalContainer.append($modal);

        $modalContainer.addClass('is-visible');
    }  /* show modal container______________________ */

    function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible');
    }

    window.addEventListener('keydown', e => {
        var $modalContainer = $('#modal-container');
        if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
        hideModal();
        }
    });

    var $modalContainer = $('#modal-container');
    $modalContainer.on('click', function(event) {
        if ($(event.target).closest('#modal-container').length) {
        hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails:loadDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})(); /* IIFE ends here */

var getAllCharacters = rickmortyRepo.getAll();

rickmortyRepo.loadList().then(function() {
    getAllCharacters.forEach(function (character){
        rickmortyRepo.addListItem (character);
    });
}); /* Catch them all! */