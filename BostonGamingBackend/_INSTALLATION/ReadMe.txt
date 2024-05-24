

VIGTIGT: 
HUSK at notere i rapporten, hvis du ændrer i backend/API - hvad du ændrer og hvorfor. 
- Og HUSK så også at aflevere din version af backenden.



----------------------------------------------------------------------------------------------------------------
------ START BACKEND: ------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

Produktion (der rettes ikke i backend): 
    npm run START

Developer (foretrukken hvis der skal rettes i backend - trækker på nodemon): 
    npm run devStart

Projektet kører på PORT 5039 - dvs. http://localhost:5039

Projektet benytter MongoDB - tjek .env-filen for at tilrette evt. path/sti til din MongoDB

Installer evt. extension: "MongoDB for VS Code" - den giver dig adgang til at kigge i din MongoDB direkte fra VS Code: 
    https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode 
    Og ellers brug MongoDB Compass eller en shell til at tjekke datagrundlaget



----------------------------------------------------------------------------------------------------------------
------ API - POSTMAN -------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

BRUG POSTMAN: til at teste API'et - både GET, POST, PUT, PATCH og DELETE
    - brug især Postman når du når til POST, PUT, DELETE - da det er her, du aflæser hvordan API'et forventer at modtage data

Filer til import i din egen Postman kan hentes i mappen: _INSTALLATION/Postman til import

Du kan også se dokumentationen og ex på metoderne her:
        https://documenter.getpostman.com/view/12464673/TVYM3FZ9



----------------------------------------------------------------------------------------------------------------
------ BILLEDER --------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

UPLOAD: Alle uploadede (post og put) image-filer sendes til en af mapperne (afhæng af route) 

    /public/images/product
    /public/images/slider

REQUEST: Billederne hentes fra frontend fx med følgende adresse (hvis du ikke har ændret på PORT'en):

    Product:
    http://localhost:5039/images/product/xxxxxxx.jpg

    Slider:
    http://localhost:5039/images/slider/xxxxxxx.jpg




----------------------------------------------------------------------------------------------------------------
------ Login - session -----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

Som udgangspunkt er tjek af admin-routes slået fra i server.js - slå det til, når/hvis du er klar til det.

Alle routes med ordet *admin* er tænkt som routes, som kræver login = der skal være sat en session-cookie hos brugeren,
og at credentials sendes med i api-kald (fetch, axios mv.)

Et korrekt login (POST af brugers email og password) sætter en 4-dages session-cookie (stored i MongoDB).

Der er minimum af kontrol på routes, data mv. så det er muligt at udføre funktionaliteter i frontend uden at være begrænset af 
    kontrol fra API'et. Men ved du, hvad du gør - så skru gerne op for sikkerhed, routes mv.

Du må selvfølgelig gerne tilføje yderligere validering, skrue op for kontrol/sikkerhed mv., ændre fra session-cookie til JWT osv.

--> MEN HUSK at aflevere din backend + notere i rapporten, hvis du har foretaget ændringer 
    --------------------------------------------------------------------------------------
    --------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------------------
------ Bruger til login mv. (password krypteres så derfor vises det oprindelige her) ---------------------------
----------------------------------------------------------------------------------------------------------------

    email:      jn@testmail.dk
    password:   admin123

Du kan selv - fx via Postman eller rest-fil - oprette yderligere brugere til login
