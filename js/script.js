//Variable qui contiendra la fonction setTimeout lorsqu'elle sera enclanchée
var messConfirmTimeout;

var formManager = Object.create(formManager);
var linksDisplay = Object.create(linksDisplay);

//Importation du formulaire dans le DOM
formManager.form_import();

//Affichage des liens au chargement de la page
linksDisplay.getLinks();


//----------------------------------------------- Evènements ---------------------------------------------

//Evènement qui remplace le bouton "ajouter un lien" par le formulaire
formManager.buttonAddLinkElt.addEventListener("click", function () {
    //suppression du contenu actuel et ajout du formulaire à la place
    formManager.contentFormElt.innerHTML = "";
    formManager.contentFormElt.appendChild(formManager.formElts);
    //Arret de l'action messConfirmTimeout si le délais n'a pas expiré
    if (messConfirmTimeout >= 0) {
        window.clearTimeout(messConfirmTimeout);
    };
    //Boucle qui supprime les message d'alerte encore actif
    for (var i = 0; i <= formManager.formElts.elements.length; i++) {
        formManager.removeErrorMessage(i);
    };
    //Réinitialisation des champs du formulaire
    formManager.formElts.elements.auteur.value = "";
    formManager.formElts.elements.titre.value = "";
    formManager.formElts.elements.url.value = "";
});

//Evènement qui ajoute les infos saisies dans le formulaire à la liste de lien
formManager.buttonSubmitElt.addEventListener("click", function (e) {
    //Récupération des données du formulaire sous forme de tableau    
    var jsFormLink = {
        titre: formManager.formElts.elements.titre.value.toString(),
        url: formManager.formElts.elements.url.value.toString(),
        auteur: formManager.formElts.elements.auteur.value.toString()
    };
    //Condition caractère >0 pour message d'erreur si un champs n'est pas rempli
    if (jsFormLink.auteur.length <= 0 || jsFormLink.titre.length <= 0 || jsFormLink.url.length <= 0) {
        formManager.addErrorMessage(jsFormLink.auteur, jsFormLink.titre, jsFormLink.url);
    } else {
        //définition du regex et vérification de l'url pour la corriger ou non
        var regexUrl = /https?:\/\/.+/;
        if (!regexUrl.test(jsFormLink.url)) {
            jsFormLink.url = "http://" + jsFormLink.url;
        };
        linksDisplay.postLink(jsFormLink,jsFormLink.titre);
        window.setTimeout(function () {
            document.getElementById("contenu").innerHTML="";
            linksDisplay.getLinks();
        }, 300);  
    };
    e.preventDefault(); //Annulation de l'envoi des données du formulaire
});


