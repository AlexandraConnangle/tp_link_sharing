var formManager = {
    //Balise <div> qui contient le Bouton "ajouter un lien"
    buttonAddLinkElt: document.createElement("div"),
    //Balise <div> qui contient le bouton "Ajouter un lien", le formulaire, ou le message de confirmation selon l'étape
    contentFormElt: document.createElement("div"),
    //Balise <form> qui contient le formulaire
    formElts:document.createElement("form"),
    //Balise <div> qui contient le Bouton submit du formulaire
    buttonSubmitElt:document.createElement("div"),
    
    //Récupération des classes concernant les messages d'erreurs sous forme d'éléments
    inputBlocsElts: document.getElementsByClassName("input-bloc"),
    alertsMessElts: document.getElementsByClassName("alert-mess"),
    alertsBlocsElts: document.getElementsByClassName("alert-bloc"),
    alertsPointesElts: document.getElementsByClassName("pointe"),
    
    // Import du formulaire dans le DOM
    form_import: function (){
        //Insertion du Bouton "ajouter un lien" dans buttonAddLinkElt sous forme de string HTML
        this.buttonAddLinkElt.innerHTML = "<button type=\"button\" style=\"margin-bottom:20px; width:115px;\"> Ajouter un lien </button>";
        // Ajout de l'élément buttonAddLinkElt dans contentFormElt
        this.contentFormElt.appendChild(this.buttonAddLinkElt);
        // Ajout de l'élément contentFormElt dans le DOM avant la div id=contenu
        document.querySelector("body").insertBefore(this.contentFormElt, document.getElementById("contenu"));
        //Insertion des champs du formulaire dans l'élément "formElts" sous forme de string HTML
        this.formElts.setAttribute("style", "margin-bottom:10px; display:flex; flex-wrap: wrap; align-items:flex-end;");
        this.formElts.innerHTML = "\
                <div class=\"input-bloc\" ><div class=\"alert-bloc\"><span class=\"alert-mess\"></span><div class=\"pointe\"></div></div> <input type=\"text\" name=\"auteur\" placeholder=\"Entrez votre nom\" style=\"width:150px; margin:0px 10px 10px 0px; border:0.5px solid silver; padding:4px; class:input-auteur;\"></input></div> \
                \
                <div class=\"input-bloc\" ><div class=\"alert-bloc\"><span class=\"alert-mess\"></span><div class=\"pointe\"></div></div> <input type=\"text\" name=\"titre\" placeholder=\"Entrez le titre du lien\" style=\"width:300px; margin:0px 10px 10px 0px; border:0.5px solid silver; padding:4px; class:input-titre;\"></input></div> \
                \
                <div class=\"input-bloc\" ><div class=\"alert-bloc\"><span class=\"alert-mess\"></span><div class=\"pointe\"></div></div> <input type=\"text\" name=\"url\" placeholder=\"Entrez l'URL du lien\" style=\"width:300px; margin:0px 10px 10px 0px; border:0.5px solid silver; padding:4px; class:input-url;\"></input></div> ";
        //Insertion du Bouton submit dans "buttonSubmitElt" sous forme de string HTML
        this.buttonSubmitElt.innerHTML = "<input type=\"submit\" value=\"Ajouter\" style=\"margin-bottom:10px; width:85px; display:inline-block;\"></input>";
        //Ajout du bouton "submit" au formulaire (formElts)
        this.formElts.appendChild(this.buttonSubmitElt);
    },
    
    // Fonction qui affiche un message de confirmation pendant 2 secondes puis le bouton "ajouter un lien"
    confirmAddLink: function (titre) {
        //Remplace le formulaire par le message de confirmation et le bouton "ajouter un lien"
        this.contentFormElt.innerHTML = "<span style=\" display:inline-block; width:98%; background-color:#D6ECF6; padding:10px; margin-bottom:20px; font-size:1.2em; color:#428bca; \">Le lien \"" + titre + "\" à bien été ajouté.</span> ";
        this.contentFormElt.appendChild(this.buttonAddLinkElt);

        //Après 2 secondes, efface le message de confirmation et le remplace par le bouton "ajouter un lien"
        var formManager = this;
        messConfirmTimeout = window.setTimeout(function () {
            formManager.contentFormElt.innerHTML = "";
            formManager.contentFormElt.appendChild(formManager.buttonAddLinkElt);
        }, 2000);
    },

    //Fonction qui crée les messages d'erreurs
    createErrorMessage: function (ElementId) {
        //Attribution du style aux éléments
        this.inputBlocsElts[ElementId].setAttribute("style","position:relative; bottom:0px; left:0px;");
        this.alertsBlocsElts[ElementId].setAttribute("style", "position:absolute; bottom:40px; left:0; border-radius:8px; background-color:white; padding:5px 15px; margin:8px 0px;  box-shadow: 1px 1px 2px silver;");
        this.alertsPointesElts[ElementId].setAttribute("style", "position:absolute; bottom:-5px; left:20px; height:0; width:0; border-top:6px solid white; border-right:6px solid transparent; border-left:6px solid transparent;");
        this.alertsMessElts[ElementId].setAttribute("style","color:red; font-size:0.7em;");
    },

    //Fonction qui supprime les messages d'erreurs
    removeErrorMessage: function (ElementId) {
        // Condition si les éléments sont présent dans le DOM
        if (this.alertsBlocsElts[ElementId] !== undefined) {
            //Suppression des attributs style et du contenu html s'il sont définis
            if (this.alertsBlocsElts[ElementId].hasAttribute("style")) {
                this.inputBlocsElts[ElementId].removeAttribute("style");
                this.alertsBlocsElts[ElementId].removeAttribute("style");
                this.alertsPointesElts[ElementId].removeAttribute("style");
                this.alertsMessElts[ElementId].removeAttribute("style");
                this.alertsMessElts[ElementId].innerHTML = "";
            };
        };
    },

    //Fonction qui affiche un message d'erreur si un champs est vide
    addErrorMessage: function (auteur, titre, url) {
        var formManager = this;
        //Condition sur le nombres de caractères < ou = 0 pour chaque champs
        if (auteur.length <= 0) {
            this.createErrorMessage(0);
            this.alertsMessElts[0].innerHTML = "Le Nom doit être saisi";
            window.setTimeout(function () {
                formManager.removeErrorMessage(0);
            }, 2500);
        };
        if (titre.length <= 0) {
            this.createErrorMessage(1);
            this.alertsMessElts[1].innerHTML = "Le Titre doit être saisi";
            window.setTimeout(function () {
                formManager.removeErrorMessage(1);
            }, 2500);
        };
        if (url.length <= 0) {
            this.createErrorMessage(2);
            this.alertsMessElts[2].innerHTML = "L'URL doit être saisie";
            window.setTimeout(function () {
                formManager.removeErrorMessage(2);
            }, 2500);
        };
    }
};