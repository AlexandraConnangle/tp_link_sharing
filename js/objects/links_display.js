var linksDisplay = {
    
    //Fonction qui ajoute du code html dans la div "contenu" du DOM à la position choisie ("beforebegin","afterbegin","beforeend" ou "afterend")
    inserDomElement: function (position, newElement) {
        document.getElementById("contenu").insertAdjacentHTML(position, newElement);
    },

    //Fonction qui crée un lien sous forme de string html et qui prend en paramètre le titre, l'url et l'auteur
    createHtmlLink: function (titre, url, auteur) {
        return "\
                <div class=\"lien\"; style=\"display:block; width:98%; margin:10px auto; color:black;\"> \
                \
                <h2 style=\"display:inline; font-size:1.1em;\"><a href=\" " + url + " \" style=\"text-decoration:none; margin-right:7px; color:#428bca;\">" + titre + "</a></h2> \
                \
                <span>" + url + "</span><br/> \
                \
                <span> Ajouté par " + auteur + "</span> \
                </div>";
    },

    //Fonction qui crée un nouveau lien html avec les informations d'un tableau d'objet
    createArrayLink: function (infoLink) {
        var titre = infoLink.titre.toString();
        var url = infoLink.url.toString();
        var auteur = infoLink.auteur.toString();
        return this.createHtmlLink(titre, url, auteur);
    },

    
    //Fonction AJAX qui envoi le nouveau lien
    postLink: function (data, titre) {
        ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien", data, function (reponse) {
            formManager.confirmAddLink(titre);
        }, true);
    },

    //Fonction AJAX charge la liste des liens
    getLinks: function () {
        ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens", function (reponse) {
            //Tableau JSON converti en tableau d'objet Javascript
            var arrayLinksList = JSON.parse(reponse);
            //Boucle foreach qui crée et insert chaque lien du tableau JSON dans le DOM
            arrayLinksList.forEach(function (infoLink) {
                var newFormLink = linksDisplay.createArrayLink(infoLink);
                linksDisplay.inserDomElement("beforeend", newFormLink);
            });
        });
    }
};