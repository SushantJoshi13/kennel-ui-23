# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### Migration scripts
Breeders script


CREATE TABLE `bre_animal` (
  `animal_id` varchar(36) NOT NULL,
  `animal_name` varchar(50) NOT NULL,
  `animal_color_and_markings` varchar(150) NOT NULL DEFAULT '',
  `animal_gender` varchar(50) NOT NULL,
  `animal_date_of_birth` date DEFAULT NULL,
  `animal_microchip_id` varchar(50) NOT NULL DEFAULT '',
  `animal_country` varchar(50) NOT NULL DEFAULT '',
  `animal_rejection_reason` varchar(1000) DEFAULT '',
  `animal_front_view_image` varchar(150) DEFAULT NULL,
  `animal_left_view_image` varchar(150) DEFAULT NULL,
  `animal_right_view_image` varchar(150) DEFAULT NULL,
  `animal_registration_doc` varchar(150) DEFAULT NULL,
  `animal_registration_number` varchar(50) NOT NULL,
  `animal_dna_doc` varchar(50) DEFAULT NULL,
  `animal_hded_doc` varchar(50) DEFAULT NULL,
  `animal_sire_id` varchar(255) DEFAULT NULL,
  `animal_dam_id` varchar(255) DEFAULT NULL,
  `animal_pedigree` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`animal_pedigree`)),
  `is_active` tinyint(4) NOT NULL DEFAULT 0,
  `registration_source` varchar(255) DEFAULT NULL,
  `animal_type_id` int(11) DEFAULT NULL,
  `animal_breed_id` int(11) DEFAULT NULL,
  `animal_owner_id` int(11) DEFAULT NULL,
  `breeder_name` varchar(256) DEFAULT '',
  `animal_tag` varchar(255) DEFAULT NULL
)


CREATE TABLE `bre_animal_breed_master` (
  `animal_breed_id` int(11) NOT NULL,
  `animal_type_id` int(11) NOT NULL,
  `animal_breed_name` varchar(50) NOT NULL,
  `animal_breed_description` longtext NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `animal_breed_image` varchar(500) DEFAULT NULL
)

CREATE TABLE `bre_animal_master` (
  `animal_type_id` int(11) NOT NULL,
  `animal_type_name` varchar(50) NOT NULL,
  `animal_type_description` varchar(150) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) 

INSERT INTO `bre_animal_breed_master` (`animal_breed_id`, `animal_type_id`, `animal_breed_name`, `animal_breed_description`, `is_deleted`, `animal_breed_image`) VALUES
(1, 17, 'MARWARI', 'The Marwari horse is a distinctive breed known for its unique appearance and historical significance. Originating in the Marwar region of Rajasthan, I', 0, 'MARWADI.jpg'),
(2, 17, 'KATHIAWARI', 'The Kathiawari is a horse breed that originated in the Kathiawar Peninsula in western India. Please note that breed standards may be subject to change', 0, 'Kathiawari_2.jpg'),
(3, 17, 'SPITI PONY', 'As of my last knowledge update in January 2022, I don\'t have specific information about a \"Spiti Pony\" in the context you\'re mentioning. However, I ca', 0, 'Carrier_Horse_of_Gaddi_community_in_Kasauli_,_Himachal_Pardes,_India.jpg'),
(4, 17, 'ZANISKARI', 'The Zaniskari or Zanskari is a breed of small mountain horse or pony from Ladakh, in northern India. It is named for the Zanskar valley or region in K', 0, 'WhatsApp Image 2023-12-31 at 4.32.22 PM.jpeg'),
(5, 17, 'MANIPURI PONY', 'The Manipuri Pony is a traditional Indian breed of small horse or pony from Assam and Manipur in north-eastern India. It appears both in the history a', 0, 'Manipur_Pony.jpg'),
(6, 17, 'BHUTIYA', 'The Bhutia Horse is a breed of small mountain horse from Sikkim and the district of Darjeeling in northern India. It has some similarity to Mongolian ', 0, 'BHUTIYA.jpg'),
(7, 17, 'INDIAN COUNTRY-BRED', 'The Indian Country-bred is an Indian horse or pony type of indeterminate mixed breeding. It is archaically known as tattoo from a Hindi word. These ho', 0, '6827idea99indian-country-bred.jpg'),
(8, 17, 'THOROUGHBED', 'The Thoroughbred is a horse breed developed for horse racing. Although the word thoroughbred is sometimes used to refer to any breed of purebred horse', 0, 'stallion-bay-coat.webp'),
(9, 17, 'BHIMTHADI', 'The Bhimthadi or Deccani horse is an almost extinct breed of Indian horses. It was developed in Pune district in 17th and 18th centuries during the Ma', 0, 'BHIMTHADI.jpg'),
(10, 17, 'AMERICAN INDIAN', 'The American Indian Horse is defined by its breed registry as a horse that may carry the ancestry of the Spanish Barb, Arabian, Mustang, or \"Foundatio', 0, 'AMERICAN IND.jpg'),
(11, 17, 'INDIAN HALF-BRED', 'The Indian Half-bred is a horse type from the subcontinent of India. It is a cross-breed between Thoroughbred stallions and local and imported mares o', 0, 'INDIAN HALF BRED.jpg'),
(12, 17, 'ARABIAN', 'The Arabian or Arab horse is a breed of horse with historic roots on the Arabian Peninsula. With a distinctive head shape and high tail carriage, the ', 0, 'ARABIAN.jpg'),
(13, 17, 'LAC LA CROIX INDIAN PONY', 'The Lac La Croix Indian Pony, also known as the Ojibwe pony is a semi-feral Canadian horse breed developed by the Ojibwe people. The population became', 0, 'LAC LA.jpg'),
(14, 17, 'SINDHI', 'The Sindhi horse is a breed of horse native to the Sindh, Kutch and Gujrat. Sindh has different types of horses such as Arabi, Samoundi, Sindhi-Kathia', 0, 'SINDHI.jpg'),
(15, 17, 'GALINEERS COB', 'The Gypsy Cob, also known as the Traditional Gypsy Cob, Irish Cob, Romani Cob, Gypsy Horse, or Gypsy Vanner, is a breed of domestic horse from the Bri', 0, 'GALINIEERS.jpg'),
(16, 17, 'FRIESIAN', 'The Friesian is a horse breed originating in Friesland in north Netherlands. The breed nearly became extinct on more than one occasion. It is classifi', 0, 'FRIESIAN.jpg'),
(17, 17, 'ANDALUSIAN', 'The Andalusian, also known as the Pure Spanish Horse or PRE, is a horse breed from the Iberian Peninsula, where its ancestors have lived for thousands', 0, 'ANDALUSIAN.jpg'),
(18, 17, 'AKHAL TEKE', 'The Akhal-Teke is a Turkmen horse breed. They have a reputation for speed and endurance, intelligence, and a distinctive metallic sheen. The shiny coa', 0, 'TEKE.jpg'),
(19, 17, 'UNMOL', 'The Unmol is a rare breed of horse from the north-western Punjab, in Pakistan. In 1995 its conservation status was listed by the FAO as \"critical\" and', 0, 'UNMOL.jpg'),
(20, 18, 'GIR', 'The Gir or Gyr is an Indian breed of zebuine cattle. It originated in the Kathiawar peninsula in the state of Gujarat, and the name of the breed deriv', 0, 'GIR.jpg'),
(21, 18, 'KRISHNA VALLEY', 'The Krishna Valley is an Indian breed of draught cattle. It originated in the areas drained by the Krishna, Ghataprabha and Malaprabha rivers. It is a', 0, 'KRISHNA.jpg'),
(22, 18, 'UMBLACHERY', 'The Umblachery is an Indian breed of zebuine cattle. It is distributed in the coastal plains of the districts of Nagapattinam, Tiruvarur and Thanjavur', 0, 'UMBLACHERY.jpg'),
(23, 18, 'SAHIWAL', 'Sahiwal cattle is a breed of Indian zebu cow, named after the Sahiwal district of modern-day Pakistan.. The cattle is mainly found in Punjab province ', 0, 'SAHIWAL.jpg'),
(24, 18, 'THARPARKAR', 'Tharparkar is a breed of cattle originating in Tharparkar District in Sindh province, currently in Pakistan, and is also found in India. It is a dual ', 0, 'THARPARKAR.jpg'),
(25, 18, 'HALLIKAR', 'Hallikar is a breed of cattle native to the state of Karnataka, India. It derives its name from the Hallikar community traditionally known for their c', 0, 'HALLIKAR.jpg'),
(26, 18, 'ONGOLE', 'Ongole cattle are an indigenous cattle breed that originates from Prakasam District in the state of Andhra Pradesh in India. The breed derives its nam', 0, 'Ongole.jpg'),
(27, 18, 'BARGUR', 'Bargur is a breed of cattle native to the Bargur forest hills in Anthiyur Taluk of Erode District in Western Tamil Nadu in India. The cattle are usual', 0, 'Bargur.jpg'),
(28, 18, 'RED SINDHI', 'The Red Sindhi is a dairy breed of zebuine cattle. It is believed to originate in western Sindh and in the Las Bela area of Balochistan, now in Pakist', 0, 'Red Sindhi.jpg'),
(29, 18, 'HARIANA/HARYANVI', 'Hariana or haryanvi is an Indian breed of cow native to North India, specially in the state of Haryana.', 0, 'Hariana.jpg'),
(30, 18, 'RATHI', 'Rathi, also synonymous with its variant Rath, is a breed of cattle indigenous to India. It originated in the region of the state of Rajasthan consisti', 0, 'RATHI.jpg'),
(31, 18, 'GUZERAT', 'The Guzerá or Guzerat is a Brazilian breed of domestic cattle. It derives from cross-breeding of Indian Kankrej cattle, imported to Brazil from 1870 o', 0, 'The GuzerÃ¡.jpg'),
(32, 18, 'NIMARI', 'Nimari is a breed of cattle native to the Nimar region of India. It originated out of Gyr and Khillari cattle breeds, and is found in the regions of N', 0, 'Nimari.jpg'),
(33, 18, 'BACHAUR', 'Bachaur is a breed of cattle native to India. The districts of Madhubani, Darbhanga and Sitamarhi in north Bihar i.e. Mithila region form the native t', 0, 'Bachaur t.jpg'),
(34, 18, 'VECHUR', 'The Vechur Cow is a rare breed of Bos indicus cattle named after the village Vechoor in Vaikom Taluk, Kottayam district of the state of Kerala in Indi', 0, 'The Vechur.jpg'),
(35, 18, 'NAGORI', 'Nagori is a cattle breed from Rajasthan, India. It is a draught breed, mainly used for agricultural purposes. It is known to have originated in Nagaur', 0, 'NAGORI.jpg'),
(36, 18, 'RED KANDHARI', 'Red Kandhari, locally known as Lal Kandhari, is a breed of cattle native to India. They are named so because of their almost universal deep red colour', 0, 'Red Kandhari.jpg'),
(37, 18, 'PONWAR', 'Ponwar is an indigenous cattle breed of India. It is known to be originated at Ponwar in Puranpur Taluk in Pilibhit district of Uttar Pradesh state an', 0, 'PONWAR.jpg'),
(38, 18, 'PUNGANUR', 'Punganur dwarf cattle which originated from the Chitoor District of Andhra Pradesh in southern India is among the world\'s smallest humped cattle breed', 0, 'PUNGANUR.jpg'),
(39, 18, 'GANGATIRI', 'Gangatiri is an indigenous cattle breed of India. It is known to be originated in the region along the banks of Ganga river in eastern Uttar Pradesh a', 0, 'GANGATIRI.jpg'),
(40, 18, 'KENKATHA/KENWARIYA', 'Kenkatha, also known as Kenwariya, is a breed of cattle native to India. They originated in the provinces of Bundelkhand in the state of Uttar Pradesh', 0, 'KENKATHA.jpg'),
(41, 18, 'GAOLAO', 'Gaolao is a breed of cattle native to India. It belongs to the subspecies Bos Indicus. It is a dual purpose breed used both as draught and milk cattle', 0, 'GAOLAO.jpg'),
(42, 18, 'BROWN SWISS', 'The Brown Swiss or American Brown Swiss is an American breed of dairy cattle. It derives from the traditional triple-purpose Braunvieh of the Alpine r', 0, 'The Brown Swiss.jpg'),
(43, 18, 'HOLSTEIN FRESIAN', 'The Holstein Friesian is an international breed or group of breeds of dairy cattle. It originated in the Dutch provinces of North Holland and Frieslan', 0, 'HOLSTEIN FRESIAN.jpg'),
(44, 18, 'JERSEY', 'The Jersey is a British breed of small dairy cattle from Jersey, in the British Channel Islands. It is one of three Channel Island cattle breeds, the ', 0, 'JERSEY.jpg'),
(45, 18, 'SUNANDINI', 'Sunandini is a composite breed of cattle developed in India by crossing nondescript cattle with Brown Swiss, Jersey cattle and Holstein Friesian cattl', 0, 'SUNANDINI.jpg'),
(46, 18, 'DANISH RED', 'Danish Red cattle, also known as Red Danish or Red Dane, are a major dairy cattle breed in northern Europe. There are 42,599 pedigree cows in Denmark.', 0, 'DANISH RED.jpg'),
(47, 18, 'AMERICAN BRAHMAN', 'The Brahman is an American breed of zebuine-taurine hybrid beef cattle. It was bred in the United States from 1885 from cattle originating in India, i', 0, 'BR.jpg'),
(48, 18, 'KHILLARI', 'The Brahman is an American breed of zebuine-taurine hybrid beef cattle. It was bred in the United States from 1885 from cattle originating in India, i', 0, 'KHILLARI.jpg'),
(49, 18, 'DANGI', 'Dangi is an indigenous cattle breed of India. It originated in the hilly tracts of Dangs comprising the Nasik and Ahmednagar districts in the state of', 0, 'DANGI.jpg'),
(51, 18, 'DEONI', 'The Deoni is an Indian breed of draught cattle. It is named after the taluk of Deoni in the Latur district of Maharashtra state, and is distributed ma', 0, 'DEONI.jpg'),
(52, 18, 'ALAMBADI', 'Alambadi cows are a medium-sized, native Indian cattle breed. They are typically grey, dark grey, or black with white markings on their forehead, limb', 0, 'ALAMBADI.webp'),
(56, 18, 'AMRIT MAHAL', 'The Amrit Mahal is a breed of cattle that originated in the former state of Mysore in Karnataka, India. The breed was developed between 1572 and 1636 ', 0, 'AMRIT MAHAL.jpg'),
(57, 18, 'BADRI', 'Badri, also known as \"Pahadi\", is a small, dual-purpose cattle breed native to the hilly regions of Uttarakhand. The breed is raised for milking and d', 0, 'Badri_Cow.jpg'),
(58, 18, 'BEHALI', 'Belahi is a dual-purpose cattle breed that produces milk and is used for draught. The Gujjar community in the foothills of Haryana has been raising th', 0, 'Belahi.jpg'),
(59, 18, 'BENGALI', 'The Bengali is a breed of cattle that originated in Bangladesh and Bengal, India. It is a Zebu or Bos indicus breed, and can range in size from small ', 0, 'BENGALI.jpg'),
(60, 18, 'BINJHAPURI/DESHI', 'Binjharpuri, also known as \"Deshi\", is a breed of cattle found in the Jajpur, Kendrapara, and Bhadrak districts of Odisha. They are a dual-purpose bre', 0, 'DESHI.jpg'),
(61, 18, 'KANKREJ', 'The Kankrej is an Indian breed of zebuine cattle. It originates from the arid region of the Rann of Kutch in the state of Gujarat, and in neighbouring', 0, 'KANKREJ.jpg'),
(62, 18, 'FRIESWAL', 'Frieswal is a crossbred dairy cattle breed in India. It is a cross between Holstein and Sahiwal cattle, with 5/8 Holstein Friesian and 3/8 Sahiwal inh', 0, 'FRIESWAL.jpg'),
(63, 18, 'GIRLANDO', 'The Girolando is a dairy cattle breed that originated in Brazil in the 1940s. \r\n The breed is a cross between Gyr cattle and Holstein cows. Gyr cattle', 0, 'Girolando.jpg'),
(64, 18, 'MEUSE-RHINE-ISSEL', 'The Meuse-Rhine-Issel or Meuse-Rhine-Yssel is a Dutch breed of dual-purpose cattle, reared both for meat and for milk. It falls within the Lowland-Pie', 0, 'Meuse-Rhine-Issel.jpg'),
(65, 18, 'BURLINA', 'The Burlina is a breed of cattle from the mountainous areas of the Veneto region of north-east Italy. It is distributed mainly in the provinces of Tre', 0, 'BURLINA.jpg'),
(66, 18, 'FRENCH SIMMENTAL', 'French Simmental cattle are medium to large animals. They are usually red pied colored with white head and legs and the red is a clear tan. They can b', 0, 'French Simmental.jpg'),
(67, 18, 'DANISH JERSY', 'The Danish Jersey is a modern Danish breed of dairy cattle. It derives from approximately 5200 head of Jersey cattle imported to Denmark from the isla', 0, 'The Danish Jersey.jpg'),
(68, 18, 'SUSSEX', 'The Sussex is a British breed of red beef cattle from the Weald of Sussex, Surrey and Kent, in south-eastern England. Its traditional use as a draught', 0, 'The Sussex.jpg'),
(69, 18, 'AUSTRALIAN FRIESIAN SAHIWAL', 'Country of origin	Queensland, Australia\r\nType	Sahiwal & Holstein-Friesian\r\nUse	Dairy production\r\nTraits\r\nColor	Black/White/Red&Black', 0, 'AUSTRALIAN FRIESIAN SAHIWAL.jpg'),
(70, 18, 'AUSTRALIAN LOWLINE', 'The Australian Lowline is a modern Australian breed of small, polled beef cattle. It was the result of a selective breeding experiment using black Abe', 0, 'AUSTRALIAN LOWLINE.jpg'),
(71, 18, 'BUSA CATTLE', 'The Buša or Busha is a breed or group of breeds of small short-horned cattle distributed in south-eastern Europe, principally in Albania and the count', 0, 'BUSA CATTLE.jpg'),
(72, 18, 'TYROL GREY', 'The Tyrol Grey or Tyrolean Grey is a typical alpine cattle breed from Tyrol in Austria and South Tyrol in Italy. It is a dual purpose breed with a ver', 0, 'TYROI GREY.jpg'),
(73, 18, 'PINZGAUER', 'The Pinzgauer is a breed of domestic cattle from the Pinzgau region of the federal state of Salzburg in Austria. It has distinctive colouring, with ch', 0, 'PINZGAUER.jpg'),
(74, 18, 'BELGIAN RED', 'Characteristics. Belgian Reds are primarily solid red with potentially a few white patches on head, dewlap, underline and legs, and udder or scrotum. ', 0, 'BELGIAN RED.jpg'),
(75, 18, 'GERMAN BLACK PIED', 'The German Black Pied Dairy was a dairy cattle breed of the former GDR, created through combination breeding. In 1963, Georg Schönmuth suggested that ', 0, 'GERMAN BLACK PIED.jpg'),
(76, 18, 'BIANCA MODENESE', 'The Bianca Modenese or Modenese is a breed of dual-purpose cattle from the Po Valley, in the Emilia Romagna and Lombardy regions of northern Italy. It', 0, 'The Bianca Modenese.jpg'),
(77, 18, 'ESTONIAN RED', 'The Estonian Red is an Estonian breed of dairy cattle. It was developed in the second half of the nineteenth century from cross-breeding of local catt', 0, 'The Estonian Red.jpg'),
(78, 18, 'RED POLL', 'The Red Poll is a dual-purpose breed of cattle developed in England in the latter half of the 19th century. The Red Poll is a cross of the Norfolk Red', 0, 'RED POLL.jpg'),
(79, 18, 'AMERICAN MILKING DEVON', 'The American Milking Devon is an American breed of dual-purpose cattle, reared both for milk and for beef. It derives from the Devon cattle of the Uni', 0, 'AD.jpg'),
(80, 18, 'DUTCH BELTED', 'The Dutch Belted or Dutch Belt is an American breed of dairy cattle. It derives from the Lakenvelder of Germany and the Netherlands, of which examples', 0, 'DUTCH BELT.jpg'),
(81, 18, 'SHORTHORN', 'The Shorthorn breed of cattle originated in the North East of England in the late eighteenth century. The breed was developed as dual-purpose, suitabl', 0, 'SHORT HORN.jpg'),
(82, 18, 'SIMMENTAL', 'The Simmental or Swiss Fleckvieh is a Swiss breed of dual-purpose cattle. It is named after the Simmental – the valley of the Simme river – in the Ber', 0, 'SIMMENTAL.jpg'),
(83, 18, 'FLECKVIEH', 'The Fleckvieh is a breed of dual-purpose cattle suitable for both milk and meat production. It originated in Central Europe in the 19th century from c', 0, 'FLECKVIEH.jpg'),
(84, 18, 'LAKENVELDER', 'The Lakenvelder is a Dutch and German breed of dairy cattle. It is reported from the Netherlands and Belgium, but may be extinct in Germany. Wikipedia', 0, 'LAKENVELDER.jpg'),
(85, 18, 'CANADIENNE', 'Canadienne cattle, also known as Black Canadienne, French Canadienne, and Black Jersey, are the only breed of dairy cattle developed in Canada. They o', 0, 'Canadienne.jpg'),
(86, 18, 'MONTBELIARDE', 'The Montbéliarde is a breed of red pied dairy cattle from the area of Montbéliard, in the département of Doubs, in the Bourgogne-Franche-Comté region ', 0, 'MontbÃ©liarde.jpg'),
(87, 18, 'LLLAWARRA', 'The Illawarra Shorthorn or Illawarra is an Australian breed of dairy cattle. Its origins are not documented, but it is thought to derive from crossbre', 0, 'The Illawarra.jpg'),
(88, 18, 'AUSTRALIAN MILKING ZEBU', 'The Australian Milking Zebu is a composite breed of dairy cattle, developed by the Commonwealth Scientific and Industrial Research Organisation in Aus', 0, 'AUSTRALIAN MILKING ZEBU.jpg'),
(89, 18, 'NORMANDE', 'The Normande is a breed of dairy cattle from the Normandy region of north-west France. It is raised principally for its milk, which is high in fat and', 0, 'Normande.jpg'),
(90, 18, 'DEXTER', 'The Dexter is an Irish breed of small cattle. It originated in the eighteenth century in County Kerry, in south-western Ireland, and appears to be nam', 0, 'DEXTER.jpg'),
(91, 18, 'PIE ROUGE DES PLAINES', 'The Pie Rouge des Plaines is a modern French breed of dairy cattle. It was created in about 1970 by cross-breeding the traditional Armorican cattle of', 0, 'PIE.jpg'),
(92, 18, 'ANGEIN', 'The Angeln is a breed of cattle originally from Angeln in Schleswig-Holstein where they are first mentioned around 1600, however some people think tha', 0, 'Angeln.jpg'),
(93, 18, 'KOSTROMA', 'The Kostroma is a Russian cattle breed developed in the first half of the 20th century in the Kostroma Oblast of Russia\'s Upper Volga region, based mo', 0, 'KOSTROMA.jpg'),
(94, 18, 'SWEDISH RED & WHITE', 'The Swedish Red-and-White, Swedish: Svensk Röd och Vit Boskap, frequently abbreviated to SRB, is a Swedish breed of dairy cattle. It was created in th', 0, 'SWEDISH RW.jpg'),
(95, 18, 'NORWEGIAN RED', 'Norwegian Red is a breed of dairy cattle developed in Norway since 1935. Since the 1970s, breeders strongly emphasized functional and production trait', 0, 'Norwegian Red.jpg'),
(96, 18, 'AYRSHIRE', 'The Ayrshire is a Scottish breed of dairy cattle. It originates in, and is named for, the county of Ayrshire in south-western Scotland. Ayrshires typi', 0, 'AYRSHIRE.jpg'),
(97, 18, 'DAIRY SHORTHORN', 'The Dairy Shorthorn is a British breed of dairy cattle. It derives from the Shorthorn cattle of Teesside, in the North Riding of Yorkshire and in Nort', 0, 'Dairy Shorthorn.jpg'),
(98, 18, 'GUERNSEY', 'The Guernsey is a breed of dairy cattle from the island of Guernsey in the Channel Islands. It is fawn or red and white in colour, and is hardy and do', 0, 'GUERNSEY.jpg'),
(99, 19, 'MURRAH', 'The Murrah buffalo is a breed of water buffalo mainly kept for milk production. It originates in Haryana and Punjab of India, where it is kept in the ', 0, 'MURRAH.jpg'),
(100, 19, 'JAFARABADI', 'Jafarabadi buffalo, Jaffrabadi buffalo or Gir buffalo is a riverine buffalo that originated in Gujarat, India. It is estimated that there are about 25', 0, 'JAFRABADI.jpg'),
(101, 19, 'NILI-RAVI', 'Nili-Ravi is a breed of domestic water buffalo of Punjab. It is distributed principally in Pakistan and India, concentrated in the Punjab region. It i', 0, 'NILI RAVI.jpg'),
(102, 19, 'NAGPURI', 'The Nagpuri is a breed of water buffalo originating in Maharashtra, India. It stands better amongst the breeds of buffaloes which combine the milk and', 0, 'NAGPURI.jpg'),
(103, 19, 'SURTI', 'The Surti is a breed of water buffalo found in the Kaira and Vadodara districts of Gujarat between the Mahi and Sabarmati rivers. Its average milk yie', 0, 'SURTI.jpg'),
(104, 19, 'PANDHARPURI', 'The Pandharpuri is a breed of water buffalo native to the dry regions of Solapur, Kolhapur, Satara and Sangli in India. The name is derived from the t', 0, 'PANDHARPURI.jpg'),
(105, 16, 'SIAMESE', 'The Siamese cat is one of the first distinctly recognised breeds of Asian cat. Derived from the Wichianmat landrace, one of several varieties of cats ', 0, 'SIAMESE.jpg'),
(106, 16, 'BRITISH SHORTHAIR', 'The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively stocky body, thick coat, and broad face. ', 0, 'BRITISH SHORTHAIR.jpg'),
(107, 16, 'MAINE COON', 'The Maine Coon is a large domesticated cat breed. It is one of the oldest natural breeds in North America. The breed originated in the U.S. state of M', 0, 'Maine Coon.jpg'),
(108, 16, 'PERSIAN', 'The Persian cat, also known as the Persian longhair, is a long-haired breed of cat characterised by a round face and short muzzle. The first documente', 0, 'The Persian.jpg'),
(109, 16, 'RAGDOLL', 'The Ragdoll is a breed of cat with a distinct colorpoint coat and blue eyes. Its morphology is large and weighty, and it has a semi-long and silky sof', 0, 'Ragdoll.jpg'),
(110, 16, 'SPHYNX', 'The Sphynx cat also known as the Canadian Sphynx, is a breed of cat known for its lack of fur. Hairlessness in cats is a naturally occurring genetic m', 0, 'SPY.jpg'),
(111, 16, 'AMERICAN SHORTHAIR', 'The American Shorthair is a breed of domestic cat believed to be descended from European cats brought to North America by early settlers to protect va', 0, 'AMERICAN SHORTHAIR.webp'),
(112, 16, 'ABYSSINIAN', 'The Abyssinian is a breed of domestic short-haired cat with a distinctive \"ticked\" tabby coat, in which individual hairs are banded with different col', 0, 'ABYSSINIAN.jpg'),
(113, 16, 'EXOTIC SHORTHAIR', 'The Exotic Shorthair is a breed of cat developed as a short-haired version of the Persian. The Exotic is similar to the Persian in many ways, includin', 0, 'EXOTIC SHORTHAIR.webp'),
(114, 16, 'SCOTTISH FOLD', 'The Scottish Fold is a distinctive breed of domestic cat characterised by a natural dominant gene mutation associated with osteochondrodysplasia. This', 0, 'SCOTTISH FOLD.webp'),
(115, 16, 'BURMESE', 'The Burmese cat is a breed of domestic cat, originating in Burma, believed to have its roots near the Thai-Burma border and developed in the United St', 0, 'BURMESE.jpg'),
(116, 16, 'BIRMAN', 'The Birman, also called the \"Sacred Cat of Burma\", is a domestic cat breed. The Birman is a long-haired, colour-pointed cat distinguished by a silky c', 0, 'BIRMAN.jpg'),
(117, 16, 'BOMBAY', 'The Bombay cat is a short-haired breed of domestic cat. Bombays are glossy solid black cats with a muscular build, and have characteristic large brigh', 0, 'BOMBAY.jpg'),
(118, 16, 'SIBERIAN', 'The Siberian is a centuries-old landrace of domestic cat in Russia, and recently developed as a formal breed with standards promulgated the world over', 0, 'SIBERIAN.jpg'),
(119, 16, 'NORWEGIAN FOREST', 'The Norwegian Forest cat is a breed of domestic cat originating in Northern Europe. This natural breed is adapted to a very cold climate, with a top c', 0, 'NORWEGIAN FOREST.webp'),
(120, 16, 'RUSSIAN BLUE', 'The Russian Blue cat, commonly referred to as just Russian Blue, is a cat breed with colors that vary from a light shimmering silver to a darker, slat', 0, 'The Russian Blue.jpg'),
(121, 16, 'MUNCHKIN', 'The Munchkin, also known as Sausage Cat, is a breed of cat characterized by its very short legs, which are caused by genetic mutation. Compared to man', 0, 'The Munchkin,.jpg'),
(122, 16, 'AMERICAN CURL', 'The American Curl is a cat characterised by its unusual ears, which curl back from the face toward the center of the back of the skull. The breed orig', 0, 'AMERICAN CURL.jpg'),
(123, 16, 'AMERICAN BOBTAIL', 'The American Bobtail is an uncommon breed of domestic cat which was developed in the late 1960s. It is most notable for its stubby \"bobbed\" tail about', 0, 'AMERICAN BOBTAIL.jpg'),
(124, 16, 'DEVON REX', 'The Devon Rex is a tall-eared, short-haired breed of cat that emerged in England during the late 1950s. They are known for their slender bodies, wavy ', 0, 'Devon Rex.webp'),
(125, 16, 'BALINESE', 'The Balinese is a long-haired breed of domestic cat with Siamese-style point coloration and sapphire-blue eyes. Wikipedia\r\nOrigin: United States\r\nTemp', 0, 'BALINESE.jpg'),
(126, 16, 'ORIENTAL SHORTHAIR', 'The Oriental Shorthair is a breed of domestic cat that is developed from and closely related to the Siamese cat. It maintains the modern Siamese head ', 0, 'Oriental Shorthair.jpg'),
(127, 16, 'CHARTREUX', 'The Chartreux is a rare breed of cat from France, and is recognised by a number of registries around the world. The Chartreux is large and muscular wi', 0, 'The Chartreux.jpg'),
(128, 16, 'TURKISH ANGORA', 'The Turkish Angora is a breed of domestic cat. Turkish Angoras are one of the ancient, natural breeds of cat, having originated in central Anatolia. T', 0, 'TURKISH ANGORA.webp'),
(129, 16, 'MANX', 'The Manx cat is a breed of domestic cat originating on the Isle of Man, with a mutation that shortens the tail. Many Manx have a small stub of a tail,', 0, 'MANX.jpg'),
(130, 16, 'JAPANESE BOBTAIL', 'The Japanese Bobtail is a breed of domestic cat with an unusual bobtail more closely resembling the tail of a rabbit than that of other cats. The bree', 0, 'Japanese Bobtail.jpg'),
(131, 16, 'RAGAMUFFIN', 'The Ragamuffin is a breed of domestic cat. It was once considered to be a variant of the Ragdoll cat but was established as a separate breed in 1994. ', 0, 'RAGAMUFFIN.jpg'),
(132, 16, 'AMERICAN WIREHAIR', 'The American Wirehair is a breed of domestic cat originating in Staten Island New York, which is characterized by its wiry fur and crinkly whiskers ca', 0, 'AMERICAN WIREHAIR.jpg'),
(133, 16, 'CORNISH REX', 'The Cornish Rex is a breed of domestic cat. The Cornish Rex has no hair except for down. Most breeds of cat have three different types of hair in thei', 0, 'CORNISH REX.webp'),
(134, 16, 'EGYPTIAN MAU', 'The Egyptian Mau is a small to medium-sized short-haired cat breed. They are one of the few naturally spotted breeds of domesticated cat. The spots of', 0, 'EGYPT.jpg'),
(135, 16, 'SOMALI', 'The Somali cat is genetically similar to the Abyssinian cat. Due to inheriting 2 copies of the recessive gene for long hair, they have a characteristi', 0, 'SOMALI.jpg'),
(136, 16, 'HIMALAYAN', 'The Himalayan, is a breed or sub-breed of long-haired cat similar in type to the Persian, with the exception of its blue eyes and its point colouratio', 0, 'HIMALAYAN.jpg'),
(137, 16, 'SELKIRK REX', 'The Selkirk Rex is a breed of cat with highly curled hair. Wikipedia\r\nOrigin: United States\r\nTemperament: Reserved, Cuddly, Loyal, Laid-back, Patient,', 0, 'SIRCAT.jpg'),
(138, 16, 'SINGAPURA CAT', 'The Singapura is the smallest breed of cat, noted for its large eyes and ears, ticked coat, and blunt tail. Wikipedia\r\nTemperament: Curious, Affection', 0, 'SINGAPURA.jpg'),
(139, 16, 'KORAT', 'The Korat cat is a silver-tipped blue-grey, short-haired breed of domestic cat with a small to medium build and a low percentage of body fat. Its body', 0, 'KORAT.jpg'),
(140, 16, 'OCI', 'The Ocicat is an all-domestic breed of cat which resembles a wild cat but has no recent wild DNA in its gene pool. The breed is unusual in that it has', 0, 'OCI.jpg'),
(141, 16, 'TONKINESE', 'Mink Tonkinese cats showing signature aquamarine eyes. Tonkinese is a domestic cat breed produced by crossbreeding between the Siamese and Burmese. Wi', 0, 'TONKINESE.jpg'),
(142, 16, 'TURKISH VAN', 'The Turkish Van is a semi-long-haired, standardised breed of domestic cat, which was developed in the United Kingdom from a selection of cats obtained', 0, 'TURKISH VAN.jpg'),
(143, 16, 'BRITISH LONGHAIR', 'The British Longhair is a medium-sized, semi-long-haired breed of domestic cat, originating in Great Britain. Wikipedia\r\nOrigin: Great Britain\r\nTICA: ', 0, 'BRITISH LONGHAIR.webp'),
(144, 16, 'HAVANA BROWN', 'The Havana Brown was the result of a planned breeding between Siamese and domestic black cats, by a group of cat fanciers in England, in the 1950s. Ea', 0, 'HAVANA.jpg'),
(145, 16, 'LAPERM', 'The LaPerm is a breed of cat. A LaPerm\'s fur is curly, with the tightest curls being on the throat and on the base of the ears. LaPerms come in many c', 0, 'LaPerm.jpg'),
(146, 16, 'CHAUSIE', 'The Chausie is a domestic breed of cat that was developed by breeding a few individuals from the non-domestic species jungle cat to a far greater numb', 0, 'CHAUSIE.jpg'),
(147, 16, 'BURMILLA', 'The Burmilla is a breed of domestic cat, that originated in the United Kingdom in 1981. It is a cross between the Chinchilla Persian and Burmese cats.', 0, 'BURMILLA.jpg'),
(148, 16, 'LYKOI', 'The Lykoi is a breed of cat derived from a natural mutation causing a form of hypotrichia found in domestic short-haired cats. The mutation has occurr', 0, 'LOKAI.jpg'),
(149, 16, 'TOYGER', 'The toyger is a breed of domestic cat, the result of breeding domestic shorthaired tabbies to make them resemble a \"toy tiger\", as its striped coat is', 0, 'toyger.webp'),
(150, 16, 'SOKOKE', 'The Sokoke is natural breed of domestic cat, developed and standardised, beginning in the late 1970s, from the feral khadzonzo landrace of eastern, co', 0, 'The Sokoke.jpg'),
(151, 16, 'COLORPOINT  SHORTHAIR', 'Colorpoint Shorthair cat are a variety of domestic cats. Depending on the cat registry, they may be considered a separate breed of cat, or more often ', 0, 'COLOR POINT.jpg'),
(152, 16, 'JAVANESE', 'The Javanese, also known as the Colorpoint Longhair in some registries, is a variety of purebred domestic cat. In the Cat Fanciers\' Association, it is', 0, 'JAVANESE.jpg'),
(153, 16, 'SNOWSHOE', 'The Snowshoe is a rare breed of domestic cat originating in the United States of America in the 1960s. The Snowshoe is a short-haired bicolour colourp', 0, 'Snowshoe.webp'),
(154, 16, 'AUSTRALIAN MIST', 'The Australian Mist is a breed of cat developed in Australia. It is a cross between the Abyssinian cat, the Burmese cat, and the Australian Tabby cat.', 0, 'MIST.jpg'),
(155, 16, 'KHAO MANEE', 'The Khao Manee cat, or Khao Plort, also known as the Diamond Eye cat, is a rare, natural breed of domestic cat originating in Thailand, which has an a', 0, 'KHAO MANEE.jpg'),
(156, 16, 'BENGAL', 'The Bengal cat is a domesticated cat breed created from a hybrid of the Asian leopard cat, with domestic cats, especially the spotted Egyptian Mau. Wi', 0, 'BENGAL.jpg'),
(157, 15, 'AFFENPINSCHER ', 'BRIEF HISTORICAL SUMMARY: Originally used as a\r\nhousedog in the region of Southern Germany. His ancestors were\r\ndepicted by Albrecht Dürer (1471 – 152', 0, 'AFFENPINSCHER.jpg'),
(158, 15, 'AFGHAN HOUND', 'BRIEF HISTORICAL SUMMARY: The first Afghans arrived in\r\nBritain in the early 1900s and one, called Zardin, won in spectacular\r\nstyle at the 1907 Cryst', 0, '228g10.jpg'),
(159, 15, 'ATLAS MOUNTAIN DOG (AIDI)', 'ORIGIN: Morocco.\r\nDATE OF PUBLICATION OF THE OFFICIAL VALID\r\nSTANDARD: 25.03.2003.\r\nUTILIZATION: Guarding and protecting his master’s flocks and\r\nbelo', 0, 'ADI.jpg'),
(160, 15, 'AIREDALE TERRIER', 'BRIEF HISTORICAL SUMMARY: The Airedale Terrier is a\r\nnative of Great Britain, from the county of Yorkshire, it is reputed\r\nthat the Airedale Show gave', 0, 'AIREDALE TERRIER.jpg'),
(161, 15, 'AKITA', 'BRIEF HISTORICAL SUMMARY: Originally Japanese dogs\r\nwere small to medium in size and no large breeds existed. Since\r\n1603 in the Akita region, Akita M', 0, 'akita.png'),
(162, 15, 'ALPINE DACHSBRACKE', 'BRIEF HISTORICAL SUMMARY: Already in ancient times, a\r\nhunting/shooting dog was used which bore a remarkable resemblance\r\nin appearance to the Alpine ', 0, 'ALPINE DACHSBRACKE.jpg'),
(163, 15, 'ALASKAN MALAMUTE', 'GENERAL APPEARANCE: The Alaskan Malamute, one of the\r\noldest Arctic sledge dogs, is a powerful and substantially built dog\r\nwith deep chest and strong', 0, 'Alaskan_Malamute.jpg'),
(164, 15, 'AMERICAN AKITA', 'BRIEF HISTORICAL SUMMARY: In the beginning, the history\r\nof the American Akitas is similar to the history of Japanese Akitas.\r\nSince 1603, in the Akit', 0, 'AMERICAN AKITA.webp'),
(165, 15, 'AMERICAN COCKER SPANIEL', 'GENERAL APPEARANCE: The American Cocker Spaniel is the\r\nsmallest member of the Sporting Group. He has a sturdy, compact\r\nbody and a cleanly chiselled ', 0, 'AMERICAN COCKER SPANIEL.jpg'),
(166, 15, 'AMERICAN FOX HOUND', 'HEAD: Should be fairly long, slightly domed at occiput.\r\nCRANIAL REGION:\r\nSkull: Broad and full.\r\nStop: Moderately defined.\r\nFACIAL REGION:\r\nMuzzle: O', 0, 'AmericanFoxhound2.jpg'),
(167, 15, 'AMERICAN STAFFORDSHIRE TERRIER', 'GENERAL APPEARANCE: The Staffordshire Terrier should give\r\nthe impression of great strength for his size; a well put together dog,\r\nmuscular, but agil', 0, 'AMERICAN_STAFFORDSHIRE_TERRIER,_Zicanâs_Bz_Ez_Dragon_(24208348891).2.jpg'),
(168, 15, 'AMERICAN WATER SPANIEL', 'GENERAL APPEARANCE: The American Water Spaniel is an\r\nactive muscular dog, medium in size with a marcel to curly coat.\r\nEmphasis is placed on proper s', 0, 'AMERICAN WATER SPANIEL.jpg'),
(169, 15, 'MEDIUM-SIZED ANGLO-FRENCH HOUND', 'GENERAL APPEARANCE: Balanced and solidly built dog, but\r\nwithout heaviness. Seen in profile, his outline must lean towards that\r\nof a well established', 0, 'MEDIUM-SIZED ANGLO-FRENCH HOUND.jpg'),
(170, 15, 'KINTAMANI-BALI DOG', 'BRIEF HISTORICAL SUMMARY:\r\nThe Kintamani-Bali Dog is a common household pet in Indonesia.\r\nThis breed is native from the village of Sukawana in the di', 0, 'KINTAMANI-BALI DOG.jpg'),
(171, 15, 'APPENZELL CATTLE DOG', 'BRIEF HISTORICAL SUMMARY: In 1853 an Appenzell Cattle\r\nDog was first described in the book “Tierleben der Alpenwelt”\r\n(Animal Life in the Alps) as a “', 0, 'APPENZELL CATTLE DOG.jpg'),
(172, 15, 'ARIEGEOIS', 'BRIEF HISTORICAL SUMMARY: Originates from the Ariège,\r\nproduct of a crossing of a Briquet with a “chien d’ordre” (scenthound\r\nhunting in a pack) which', 0, 'ARIEGEOIS.jpg'),
(173, 15, 'AUSTRALIAN CATTLE DOG', 'BRIEF HISTORICAL SUMMARY: The Australian Cattle Dog\r\nwas developed to assist with establishing the cattle industry in\r\nearly Australian conditions. Th', 0, 'AUSTRALIAN CATTLE DOG.jpg'),
(174, 15, 'AUSTRALIAN KELPIE', 'BRIEF HISTORICAL SUMMARY: Following the opening of\r\nvast areas of land in the Australian States of New South Wales\r\nand Victoria, the sheep numbers in', 0, 'AUSTRALIAN KELPIE.jpg'),
(175, 15, 'AUSTRALIAN SHEPHERD', 'BRIEF HISTORICAL SUMMARY: While there are many\r\ntheories as to the origin of the Australian Shepherd, the breed as we\r\nknow it today developed exclusi', 0, 'AUSTRALIAN SHEPHERD.jpg'),
(176, 15, 'AUSTRALIAN SILKY TERRIER', 'BRIEF HISTORICAL SUMMARY: The two main ancestors of\r\nthis breed were the Australian Terrier and the Yorkshire\r\nTerrier. During the period 1820-1830 a ', 0, 'AUSTRALIAN SILKY TERRIER.jpg'),
(177, 15, 'AUSTRALIAN STUMPY TAIL CATTLE', 'BRIEF HISTORICAL SUMMARY: The “Stumpy Tail” has a long\r\nhistory in Australia and was carefully bred for herding cattle in the\r\nearly-19th Century. The', 0, 'AUSTRALIAN STUMPY TAIL CATTLE DOG.jpg'),
(178, 15, 'AUSTRALIAN TERRIER', 'BRIEF HISTORICAL SUMMARY: Although produced from\r\nBritish ancestors, the Australian Terrier is one of the few breeds\r\nin the terrier group to have bee', 0, 'AUSTRALIAN TERRIER.jpg'),
(179, 15, 'AZAWAKH', 'BRIEF HISTORICAL SUMMARY: It is an African sighthound\r\ndescending from the types pictured in the wall paintings of the\r\nCentral Sahara which date back', 0, 'AZAWAKH.jpg'),
(180, 15, 'FRENCH WATER DOG', 'BRIEF HISTORICAL SUMMARY: A very ancient breed,\r\ncommon throughout France, used for hunting waterfowl and\r\ndescribed or mentioned in several works as ', 0, 'FRENCH WATER DOG.jpg'),
(181, 15, 'BASENJI', 'GENERAL APPEARANCE: Lightly built, finely boned\r\naristocratic looking animal, high on legs compared with its length,\r\nalways poised, alert and intelli', 0, 'BASENJI.jpg'),
(182, 15, 'NORMAN ARTESIEN BASSET', 'ORIGIN: France.\r\nDATE OF PUBLICATION OF THE OFFICIAL VALID\r\nSTANDARD: 01.08.2023.\r\nUTILIZATION: Small game hunting dog used for hunting with\r\nthe gun.', 0, 'NORMAN ARTESIEN BASSET.jpg'),
(183, 15, 'BLUE GASCONY BASSET', 'ORIGIN: France.\r\nDATE OF PUBLICATION OF THE OFFICIAL VALID\r\nSTANDARD: 01.08.2023.\r\nUTILIZATION: Hound used to hunt with the gun, sometimes\r\nfor coursi', 0, 'BLUE GASCONY BASSET.jpg'),
(184, 15, 'BASSET FAUVE DE BRETAGNE', 'ORIGIN: France.\r\nDATE OF PUBLICATION OF THE OFFICIAL VALID\r\nSTANDARD: 25.03.2003.\r\nUTILISATION: Scent hound used for hunting rabbit, hare, fox,\r\nroe d', 0, 'BASSET FAUVE DE BRETAGNE.jpg'),
(185, 15, 'BASSET HOUND', 'BRIEF HISTORICAL SUMMARY: The Basset was reputedly\r\nbred by monks in France in the Middle Ages to hunt in heavy cover\r\nand is able to hold its nose cl', 0, 'BASSET HOUND.jpg'),
(186, 15, 'BAVARIAN MOUNTAIN SCENT HOUND', 'BRIEF HISTORICAL SUMMARY: All Liam Hounds (Leithunde)\r\nand Leashhounds (Schweisshunde) are descended from the original\r\nhunting dogs, the “Bracken”. A', 0, 'BAVARIAN MOUNTAIN SCENT HOUND.jpg'),
(187, 15, 'BEAGLE', 'BRIEF HISTORICAL SUMMARY: The Beagle, said to have\r\nbeen bred down from the larger Foxhound to hunt with men on\r\nfoot, preferably after the hare. He i', 0, 'BEAGLE.jpg'),
(188, 15, 'BEAGLE HARRIER', 'GENERAL APPEARANCE: Dog of medium proportions,\r\nbalanced distinguished, agile and vigorous.\r\nHEAD: Moderately strong.\r\nCRANIAL REGION:\r\nSkull: Rather ', 0, 'BEAGLE HARRIER.jpg'),
(189, 15, 'BEARDED COLLIE', 'BRIEF HISTORICAL SUMMARY: There is mention of a breed\r\nresembling the Bearded Collie in Scottish records dating back to\r\naround the sixteenth century.', 0, 'BEARDED COLLIE.jpg'),
(190, 15, 'BEDLINGTON TERRIER', 'BRIEF HISTORICAL SUMMARY: It is claimed that the\r\nBedlington can boast a longer traceable pedigree than any other\r\nterrier and once was known as the R', 0, 'BEDLINGTON TERRIER.jpg'),
(191, 15, 'WHITE SWISS SHEPHERD DOG', 'BRIEF HISTORICAL SUMMARY: In the USA and Canada\r\nWhite Shepherd dogs have gradually become to be accepted as a\r\ndistinct breed. The first dogs of this', 0, 'WHITE SWISS SHEPHERD DOG.jpg'),
(192, 15, 'BEAUCE SHEEPDOG', 'BRIEF HISTORICAL SUMMARY: “Beauce Dog”, “Beauceron”\r\nand “Red-Stocking” were the names chosen at the end of the XIX\r\ncentury to designate these ancien', 0, 'BEAUCE SHEEPDOG.jpg'),
(193, 15, 'BRIARD', 'BRIEF HISTORICAL SUMMARY: Known for a long time as\r\nChiens de Berger français de Plaine (French Lowlands Sheepdog).\r\nIt was in 1809, in the Abbot Rozi', 0, 'BRIARD.jpg'),
(194, 15, 'PICARDY SHEEPDOG', 'BRIEF HISTORICAL SUMMARY: The Picardy Sheepdog has\r\nvery ancient origins. Of course it is not certain that the Picardy\r\nShepherd originates strictly f', 0, 'PICARDY SHEEPDOG.jpg'),
(195, 15, 'BERNESE MOUNTAIN DOG', 'BRIEF HISTORICAL SUMMARY: The Bernese Mountain Dog\r\nis a farm dog of ancestral origin which was used as a guard and\r\ndraught dog and for driving cattl', 0, 'BERNESE MOUNTAIN DOG.jpg'),
(196, 15, 'BICHON FRISE', 'BRIEF HISTORICAL SUMMARY: The Bichon Frisé was\r\nbrought to France from Italy during the Renaissance. As it looked\r\nlike a very small Barbet, it was gi', 0, 'BICHON FRISE.webp'),
(197, 15, 'HAVANESE', 'BRIEF HISTORICAL SUMMARY: The breed comes from the\r\nWestern Mediterranean region and has developed along the Spanish\r\nand Italian coastal region. It w', 0, 'HAVANESE.webp'),
(198, 15, 'BILLY', 'GENERAL APPEARANCE: Well constructed hound, strong, yet\r\nlight; forequarters more powerful than hindquarters.\r\nHEAD: Fairly fine, lean, of medium leng', 0, 'BILLY.webp'),
(199, 15, 'BLACK AND TAN COONHOUND', 'GENERAL APPEARANCE : The Black and Tan Coonhound is\r\nfirst and fundamentally a working dog, a trail and tree hound,\r\ncapable of withstanding the rigor', 0, 'BLACK AND TAN COONHOUND.jpg'),
(200, 15, 'BOLOGNESE', 'BRIEF HISTORICAL SUMMARY: The origin of the Bolognese\r\nis confused with that of the Maltese, because their distant ancestors\r\nare the same little dogs', 0, 'BOLOGNESE.jpg'),
(201, 15, 'BORDER COLLIE', 'GENERAL APPEARANCE: Well proportioned, smooth outline\r\nshowing quality, gracefulness and perfect balance, combined with\r\nsufficient substance to give ', 0, 'BORDER COLLIE.jpg'),
(202, 15, 'BORDER TERRIER', 'GENERAL APPEARANCE: Essentially a working terrier.\r\nCapable of following a horse.\r\nBEHAVIOUR / TEMPERAMENT: Combining activity with\r\ngameness.\r\nHEAD: ', 0, 'BORDER TERRIER.jpg'),
(203, 15, 'BOSNIAN BROKEN-HAIRED HOUND - CALLED BARAK', 'BRIEF HISTORICAL SUMMARY: This breed was registered\r\nwith the F.C.I. on the 19th June 1965, under Standard n° 155 and\r\nunder the name of Illyrian Houn', 0, 'BOSNIAN BROKEN-HAIRED HOUND - CALLED BARAK.jpg'),
(204, 15, 'BOSTON TERRIER', 'GENERAL APPEARANCE: The Boston Terrier is a lively, highly\r\nintelligent, smooth coated, short-headed, compactly built, shorttailed, well balanced dog,', 0, 'BOSTON TERRIER.jpg'),
(205, 15, 'FRENCH BULLDOG', 'BRIEF HISTORICAL SUMMARY: Probably descending, like all\r\nmastiffs, from the Epirus and the Roman Empire molossers, relative\r\nof the Bulldog of Great B', 0, 'FRENCH BULLDOG.jpg'),
(206, 15, 'BOUVIER DES ARDENNES', 'BRIEF HISTORICAL SUMMARY: It has always been called the\r\ncowdog in the Belgian Ardennes and been selected for its abilities. It\r\ngets its name from th', 0, 'BOUVIER DES ARDENNES.jpg'),
(208, 15, 'BOUVIER DES FLANDRES', 'UTILIZATION: Originally the Bouvier des Flandres was used as a\r\nherding dog, as a draught dog and as churning dog. The\r\nmodernisation of farm equipmen', 0, 'BOUVIER DES FLANDRES.jpg'),
(209, 15, 'ITALIAN POINTING DOG', 'BRIEF HISTORICAL SUMMARY: This dog of ancient Italian\r\norigin used for bird hunting has modelled itself and developed over\r\nthe ages; from the hunting', 0, 'ITALIAN POINTING DOG.jpg'),
(210, 15, 'AUSTRIAN BLACK AND TAN HOUND', 'BRIEF HISTORICAL SUMHARY: The Black and Tan Austrian\r\nHound (Brandlbracke) counts as a true descendant of the \"Keltenb\r\nracke\" (Celtic Hound). As with', 0, 'AUSTRIAN BLACK AND TAN HOUND.webp'),
(211, 15, 'AUVERGNE POINTER', 'BRIEF HISTORICAL SUMMARY: The Auvergne pointer is a\r\nvery ancient breed, present in the Cantal region for more than two\r\ncenturies. Descending from a ', 0, 'AUVERGNE POINTER.jpg'),
(212, 15, 'ARIEGE POINTING DOG', 'BRIEF HISTORICAL SUMMARY: The Ariège Pointer is most\r\nlikely issued from the old French Braques. The crossings made\r\nduring the 19th century with Braq', 0, 'ARIEGE POINTING DOG.jpg'),
(213, 15, 'BOURBONNAIS POINTING DOG', 'BRIEF HISTORICAL SUMMARY: The Bourbonnais Pointing\r\nDog was already known in 1598 (“Natural History”, Aldovrandi –\r\nNational Library).\r\nThe ancient au', 0, 'BOURBONNAIS POINTING DOG.jpg'),
(214, 15, 'FRENCH POINTING DOG - GASCOGNE TYPE', 'BRIEF HISTORICAL SUMMARY: There are two different types\r\nof French Pointing Dogs: the large size « Gascogne type » and the\r\nsmall size « Pyrenean type', 0, 'FRENCH POINTING DOG - GASCOGNE TYPE.jpg'),
(215, 15, 'FRENCH POINTING DOG - PYRENEAN TYPE', 'The small size French Pointing Dogs « Pyrenean type » show, while\r\nkeeping all proportions, with more reduced dimensions and lighter\r\nshapes, the same', 0, 'FRENCH POINTING DOG - PYRENEAN TYPE.jpg'),
(216, 15, 'SAINT GERMAIN POINTER', 'BRIEF HISTORICAL SUMMARY: It is a descendant of dogs\r\nobtained by crossing an English pointer with a Continental pointer.\r\nThe breed was created aroun', 0, 'SAINT GERMAIN POINTER.jpg'),
(217, 15, 'BRIQUET GRIFFON VENDEEN', 'BRIEF HISTORICAL SUMMARY: It is the only breed having\r\nkept this name « Briquet », which means « medium-sized dog ».\r\nSelection dates from before the ', 0, 'BRIQUET GRIFFON VENDEEN.jpg'),
(218, 15, 'BROHOLMER', 'BRIEF HISTORICAL SUMMARY: As a type this breed has been\r\nknown since the Middle Ages, when it was used for hunting (staghunting). Later on it was used', 0, 'BROHOLMER.jpg'),
(219, 15, 'BULL TERRIER', 'BRIEF HISTORICAL SUMMARY: It was a certain James Hinks\r\nwho first standardised the breed type in the 1850s, selecting the eggshaped head. The breed wa', 0, 'BULL TERRIER.jpg'),
(220, 15, 'BULLDOG', 'BRIEF HISTORICAL SUMMARY: The Bulldog was first\r\nclassified as such in the 1630s though there is earlier mention of\r\nsimilar types referred to as band', 0, 'BULLDOG.jpg'),
(221, 15, 'BULLMASTIFF', 'BRIEF HISTORICAL SUMMARY: The Bullmastiff evolved from\r\nthe Old English Mastiff and the Bulldog. Primarily used as a guard\r\ndog and, in olden times, t', 0, 'BULLMASTIFF.jpg'),
(222, 15, 'MAJORCA SHEPHERD DOG', 'BRIEF HISTORICAL OVERVIEW: Dog in profile slightly\r\nconvex, large but not exaggerated and of medium weight;\r\nit is entirely black or black with white ', 0, 'MAJORCA SHEPHERD DOG.jpg'),
(223, 15, 'CAIRN TERRIER', 'GENERAL APPEARANCE: Agile, alert, of workmanlike, natural\r\nappearance. Standing well forward on forepaws. Strong quarters.\r\nDeep in rib, very free in ', 0, 'CAIRN TERRIER.jpg'),
(224, 15, 'CANAAN DOG', 'GENERAL APPEARANCE: A medium sized, well balanced,\r\nstrong and square dog resembling the wild dog type. Strong\r\ndistinction between the sexes.\r\nBEHAVI', 0, 'CANAAN DOG.jpg'),
(225, 15, 'CANADIAN ESKIMO DOG', 'UTILIZATION: For centuries this breed was used as a draught\r\nanimal and was capable of pulling between 45 and 80 kg. per dog,\r\ncovering distances from', 0, 'CANADIAN ESKIMO DOG.jpg'),
(226, 15, 'ITALIAN CANE CORSO', 'BRIEF HISTORICAL SUMMARY: Its direct ancestor is the old\r\nRoman Molossian. Formerly scattered all over Italy, in the recent past,\r\nthe breed was only ', 0, 'ITALIAN CANE CORSO.jpg'),
(227, 15, 'BERGAMASCO SHEPHERD DOG', 'BRIEF HISTORICAL SUMMARY: The Bergamasco is an ancient\r\nbreed of a herd dog widespread across the Italian Alpine and preAlpine regions; a particularly', 0, 'BERGAMASCO SHEPHERD DOG.jpg'),
(228, 15, 'MAREMMA AND THE ABRUZZES SHEEPDOG', 'BRIEF HISTORICAL SUMMARY: This ancient breed of dogs\r\nwho guard flocks comes from shepherd dogs actually still used in the\r\nAbruzzes where the breedin', 0, 'MAREMMA AND THE ABRUZZES SHEEPDOG.jpg'),
(229, 15, 'POODLE', 'Dog of medium proportions, with a\r\ncharacteristic frizzy coat which is either curly or corded. The\r\nappearance is that of an intelligent dog, constantly alert and active,\r\nharmoniously built, giving an impression of elegance and pride. ', 0, 'POODLE.jpg'),
(230, 15, 'ESTRELA MOUNTAIN DOG', 'Since remote times, this dog\r\nhas developed and settled in the Estrela Mountains area, its true\r\norigin being lost in time. Nevertheless, it can be considered one of\r\nthe most ancient breeds in the Iberian Peninsula. It can be found\r\nfrom the foot of the mountains to the summit (approximately 2000\r\nm), mainly in the summer, after the snow has melted, when the green\r\npastures are much sought after by the herds, because the excessive\r\nheat has dried the grass on the lowlands. The progressive recognition\r\nof its aptitudes has led to its diffusion throughout the world since the\r\nsecond half of the 20th century.\r\n', 0, '12.jpg'),
(231, 15, 'PORTUGUESE SHEEPDOG', 'Sheepdog used in the\r\nAlentejo region for herding and watching different kinds of\r\nlivestock; sheep, cattle, horses, goats and pigs. An austere and rustic\r\ndog perfectly adapted to the area’s temperature changes and with\r\ngreat endurance for covering long distances herding livestock\r\nthrough the Alentejo plains.\r\n', 0, 'PORTUGUESE SHEEPDOG.jpg'),
(232, 15, 'PORTUGUESE WATER DOG', 'In ancient times, the\r\nPortuguese Water Dog could be found throughout the entire\r\nPortuguese coast. Thereafter, due to continuous changes in fishing\r\nmethods, the breed was located mainly in the Algarve region which\r\nis now considered as its original birthplace. Its presence on the\r\nPortuguese coast is probably very remote and thus the Portuguese\r\nWater Dog should be considered as an autochthonous Portuguese\r\nbreed.', 0, 'PORTUGUESE WATER DOG.jpg'),
(233, 15, 'CASTRO LABOREIRO DOG', 'One of the most ancient breeds\r\nin the Iberian Peninsula, it owes its name to the village of Castro\r\nLaboreiro, located in the Melgaço municipality in the extreme north of\r\nPortugal, where it comes from. It is a rustic mountainous area, ranging\r\nfrom the M-inho River to the Peneda and Soajo Mountains with\r\naltitudes of up to 1400 m. It is delimited by the Minho, Trancoso,\r\nLaboreiro and Mouro rivers.', 0, 'CASTRO LABOREIRO DOG.jpg'),
(234, 15, 'TRANSMONTANO MASTIFF', 'The origin of this breed is\r\ncommon to the history of all Iberian mastiffs and its evolution is linked\r\nwith Peninsular transhumance routes. It is a companion of the\r\nshepherd with specific duties in guarding against wolf attacks, since\r\never abundant in the area. In remote times, this dog settled in the\r\nPortuguese highlands, namely in Trás-os-Montes.\r\nIn this mountainous area, characterized by steep pastures of difficult\r\nroad access, the breed adjusted to the region’s conditions and sheep\r\nand goat flocks that, traditionally, graze in these areas, evolving until\r\nit its morphological traits were defined, in perfect symbiosis with the\r\nenvironment and with the work demanded.', 0, 'TRANSMONTANO MASTIFF.jpg'),
(235, 15, 'SAINT MIGUEL CATTLE DOG', ' A cattle dog originating in the\r\nisland of Saint Miguel in the Azores, also known as the « Cow\r\nDog ». Its history is linked to that of the now extinct Terceira Dog.\r\nThe existence of the Saint Miguel Cattle Dog has been documented\r\nsince the beginning of the 19th century.\r\n', 0, 'SAINT MIGUEL CATTLE DOG.webp'),
(236, 15, 'CAVALIER KING CHARLES SPANIEL', 'Origin	United Kingdom\r\nTraits\r\nWeight	5.4–8 kg (12–18 lb)\r\nColour	Blenheim, black-and-tan, ruby or tri-colour\r\nLife span	interquartile range 8.1–12.3, median 9.9[1] ', 0, 'CAVALIER KING CHARLES SPANIEL.jpg');
INSERT INTO `bre_animal_breed_master` (`animal_breed_id`, `animal_type_id`, `animal_breed_name`, `animal_breed_description`, `is_deleted`, `animal_breed_image`) VALUES
(237, 15, 'CZECHOSLOVAKIAN WOLFDOG', ': In the year 1955 a biological\r\nexperiment took place in the CSSR of that time, namely, the crossing\r\nof a German Shepherd Dog with a Carpathian wolf. The experiment\r\nestablished that the progeny of the mating of male dog to female\r\nwolf as well as that of male wolf to female dog, could be reared. The\r\nvast majority of the products of these matings possessed the genetic\r\nrequirements for continuation of breeding. In the year 1965, after the\r\nending of the experiment, a plan for the breeding of this new breed\r\nwas worked out. This was to combine the usable qualities of the\r\nwolf with the favourable qualities of the dog. In the year 1982, the\r\nCeskoslovenský Vlciak, through the general committee of the\r\nbreeders’ associations of the CSSR of that time, was recognized as a\r\nnational breed.\r\n', 0, 'CZECHOSLOVAKIAN WOLFDOG.webp'),
(238, 15, 'BOHEMIAN WIRE-HAIRED POINTING GRIFFON', ': The Cesky Fousek was the\r\nmost widely kept wirehaired Pointing dog in the region of the present\r\nday Czech and Slovakian Republics in the time before the first\r\nWorld War. This World War and its consequences were responsible\r\nfor the Cesky Fousek nearly dying out in the twenties. The\r\nregeneration of the breed was implemented. The foundation for this\r\nregenaration was brought about by some of the original typical\r\nspecimen from which the modern type of Cesky Fousek was evolved\r\nby planned breeding. At present its numbers are in second place for\r\nall hunting breeds used in the Czech and Slovakian Republics.', 0, 'BOHEMIAN WIRE-HAIRED POINTING GRIFFON.jpg'),
(239, 15, 'CESKY TERRIER', 'The Czech Terrier is the\r\nresult of an appropriate crossbreeding between a Sealyham Terrier\r\ndog and a Scotch Terrier bitch, with the aim to develop a light,\r\nshort legged, well pigmented hunting Terrier, with practical drop\r\nears, easy to groom and easy to train. In 1949 Mr. Frantisek Hork\r\nfrom Kl novice near Prague started to improve the breed by fixing\r\ntheir characteristics. In 1959 these dogs were shown for the first\r\ntime, and the breed was finally recognized by the FCI in 1963.', 0, 'CESKY TERRIER.jpg'),
(240, 15, 'POLISH GREYHOUND', 'The presence of the Chart\r\nPolski in Poland is attested since the 13th century; this breed goes\r\nprobably back to Asiatic sighthounds of Saluki type. The Borzoi\r\nbeing unknown before the reign of Iwan the Terrible during the\r\nXVIth century, it is impossible, as claimed by the Russian author\r\nSabaniejew, that the Chart Polski would be the result of\r\ninterbreeding between the Greyhound and the Borzoi. The mention\r\nof the Chart Polski in the literature, especially the hunt-literature, is\r\nfrequent and the iconographic representations are noticeably\r\nunvarying. This uniform general appearance in drawings and\r\npaintings proves, that, in spite of different interbreeding, the original\r\naspect of the breed has remained unchanged up to the end of the\r\nXIXth century.\r\n', 0, 'polish greyhound.webp'),
(241, 15, 'CHESAPEAKE BAY RETRIEVER', 'Equally proficient on land and in the\r\nwater, the Chesapeake Bay Retriever was developed along the\r\nChesapeake Bay to hunt waterfowl under the most adverse weather\r\nand water conditions, often having to break ice during the course of\r\nmany strenuous multiple retrieves. Frequently the Chesapeake must\r\nface wind, tide and long cold swims in its work. The breed\'s\r\ncharacteristics are specifically suited to enable the Chesapeake to\r\nfunction with ease, efficiency and endurance. In head, the\r\nChesapeake\'s skull is broad and round with a medium stop. The jaws\r\nshould be of sufficient length and strength to carry large game birds\r\nwith an easy, tender hold. The double coat consists of a short, harsh,\r\nwavy outer coat and a dense, fine, wooly undercoat containing an\r\nabundance of natural oil and is ideally suited for the icy rugged\r\nconditions of weather the Chesapeake often works in. In body, the\r\nChesapeake is a strong, well-balanced, powerfully built animal of\r\nmoderate size and medium length in body and leg, deep and wide in\r\nchest, the shoulders built with full liberty of movement, and with no\r\ntendency to weakness in any feature, particularly the rear. The\r\npower though, should not be at the expense of agility or stamina.\r\nSize and substance should not be excessive as this is a working\r\nretriever of an active nature. ', 0, 'CHESAPEAKE BAY RETRIEVER.webp'),
(242, 15, 'ARTOIS HOUND', 'The Artois Hound is a Briquet (small type),\r\nnowadays especially used in hunting with the gun. He drives the\r\ngame closer taking advantage of their faults with cleverness, and his\r\nspeed is average but maintained.\r\n• In the country: Because of his acute sense of smell, he is\r\ncapable of out manoeuvring the tricks of the hare.\r\n• In the wood: With his incontestable qualities of a hunter, in\r\nthe sparse and well scattered groups of tall trees, he hunts a\r\ndeer beautifully in the desired direction.\r\n• In the thicket: his intrepidity and bravery means that he can\r\nstir up and even obstinate boar.\r\n• Moreover: He is a hardy animal, endowed with a marvellous\r\ntongue in a high pitched voice which can be heard from far\r\naway. Six to eight tricolour matching Artois hounds\r\nconstitute a small pack susceptible of giving pleasure to a\r\nmost demanding huntmaster.\r\n', 0, 'ARTOIS HOUND.jpg'),
(243, 15, 'BELGIAN SHEPHERD DOG', 'The Belgian Shepherd is a\r\nmediolineal dog, harmoniously proportioned, combining elegance\r\nand power, of medium size, with dry, strong muscle, fitting into a\r\nsquare, rustic, used to the open air life and built to resist the frequent\r\natmospheric variations of the Belgian climate.\r\nThrough the harmony of its shape and its high head-carriage, the\r\nBelgian Shepherd should give the impression of that elegant strength\r\nwhich has become the heritage of the selected representatives of a\r\nworking breed. The Belgian Shepherd is to be judged in its natural\r\nstance, without physical contact with the handler.\r\n', 0, 'BELGIAN SHEPHERD DOG.webp'),
(244, 15, 'PYRENEAN SHEEPDOG - SMOOTH FACED', 'This variety of Pyrenean\r\nSheepdog was principally found in the Pyrenean foot-hills where it\r\nwas “much appreciated by horse-dealers and cattle-drovers”\r\naccording to Bernard SÉNAC-LAGRANGE (1927 club’s yearbook).\r\nIts distinctive features compared with those of other types of\r\nPyrenean Sheepdogs gained it an appendix in the breed standard\r\nfrom the 1920s.\r\n', 0, 'PYRENEAN SHEEPDOG - SMOOTH FACED.jpg'),
(245, 15, 'LONG-HAIRED PYRENEAN SHEEPDOG', 'Coming from humble\r\nbeginnings, it was practically unknown to the official dog scene until\r\nthe early 20th century. Its type varies considerably from one valley to\r\nthe next, its shape, its coat can be very different, but its character and\r\nbehaviour never vary. The first official standard was drawn up\r\nbetween 1921 and 1925 by Mr. Bernard Sénac-Lagrange. It was\r\nfirst modified under his presidency and then under those of\r\nMessrs. Charles Duconte (1954-1986), Guy Mansencal (1986-\r\n2000) and Alain Pécoult (since 2000-…) in close collaboration\r\nwith Raymond Triquet since 2001.', 0, 'LONG-HAIRED PYRENEAN SHEEPDOG.jpg'),
(246, 15, 'PYRENEAN MOUNTAIN DOG', 'Present in the Pyrenees from\r\ntime immemorial, known in the Middle Ages and used as a guardian\r\nof castles, it is mentioned by Gaston Phoebus in the 14th century.\r\nAlready appreciated as a companion dog in the 17th century, it\r\nreached glorious heights at the court of Louis XIV. The first detailed\r\ndescription of this breed dates from 1897 in the book by Count de\r\nBylandt. Ten years later the first breed clubs were set up and in 1923\r\nthe Réunion of Pyrenean Dog Fanciers ( Réunion des Amateurs de\r\nChiens Pyrénées – R.A.C.P.), at the instigation of Mr Bernard SénacLagrange, registered the official standard with the SCC (Société\r\nCentrale Canine, French K.C.) the current standard is still very close\r\nto the standard worked out in 1923, only a few clarifying\r\namendments having been made.\r\n', 0, 'PYRENEAN MOUNTAIN DOG.webp'),
(247, 15, 'BLOODHOUND', 'Scent hound for large game venery, service dog,\r\ntracking dog and family dog. It was and it must always remain a\r\nhound which due to its remarkable sense of smell is foremost a leash\r\nhound, often used not only to follow the trail of wounded game as in\r\nthe blood scenting trials but also to seek out missing people in police\r\noperations. Due to its functional construction, the Bloodhound is\r\nendowed with great endurance and also an exceptional nose which\r\nallows it to follow a trail over a long distance and difficult terrain\r\nwithout problems.', 0, 'BLOODHOUND.webp'),
(248, 15, 'CHIHUAHUA', 'The Chihuahua is regarded as\r\nthe smallest pedigree dog in the world and carries the name of the\r\nlargest state of the Mexican Republic (Chihuahua). One assumes\r\nthat these dogs used to live in the wild and, at the time of the Toltec\r\ncivilization, were captured and domesticated by the natives.\r\nRepresentations of a Toy dog called « Techichi » which lived in\r\nTula, were used as decorations on town architecture. These statues\r\nare very similar to the present-day Chihuahua.', 0, 'CHIHUAHUA.jpg'),
(249, 15, 'JAPANESE CHIN', 'According to ancient\r\ndocuments it is assumed that the ancestors of the Chin were\r\npresented as a gift from the rulers of Korea (during the Silla Dynasty\r\nage 377–935) to the Japanese court in 732. For a successive 100\r\nyears, there appears to have been a large number of Chins coming\r\ninto Japan. Historical records also indicate that envoys sent to China\r\n(during the Tung Dynasty age 618–910) and North Korea (during the\r\nPo H’ai Dynasty age 698–926) brought back dogs of this breed\r\ndirectly. During the reign of the Shogunate Tsunayoshi Tokugawa\r\n(1680–1709) the breed was raised as an indoor toy dog in the Castle\r\nof Edo. In 1613 a British Captain, named Searles brought a Chin to\r\nEngland and in 1853 Commodore Perry from the U.S. brought\r\nseveral to the U.S. of which two were presented to Queen Victoria of\r\nEngland. Since 1868, the Chin has been favored as a lapdog by ladies\r\nof the upper classes, and currently is being widely spread as a\r\ncompanion dog.', 0, 'JAPANESE CHIN.jpg'),
(250, 15, 'CHINESE CRESTED DOG', 'The Chinese Crested Dog\r\ncomes in two varieties - the Hairless and the Powder Puff. The\r\n‘Hairless’ have a crest of hair on their head extending part way\r\ndown their neck, ‘socks’ covering their toes, and a plume on their\r\ntail. The rest of their body is, as their name implies, hairless. The\r\n‘Powder Puff’ variety is covered entirely with a veil of long soft\r\nhair. While it is difficult to pinpoint their origin, it is said that they\r\nwere owned by families of the Han Dynasty of China. The Chinese\r\nCresteds were developed at this time as guardians of the treasure\r\nhouses and, in a larger, heavier form, as hunting dogs. They were\r\nseen at shows in America from 1885 to 1926 but then were rarely\r\never seen for some fifty years. ', 0, 'CHINESE CRESTED DOG.jpg'),
(251, 15, 'BOHEMIAN SHEPHERD DOG', 'This breed has its origin in history.\r\nIn his work extolling the Chodsko region (1923-1924), the writer Jindrich\r\nSimoon Baar described dogs from the Sumava region, which he called\r\nChodsky. These balanced and very tenacious dogs were used for guarding\r\nand protecting and to round up cattle. There are many writings and\r\nillustrations linked with the region of Chodsko. J.A. Gabriel, writing about\r\nChodsko in 1864, described the local people with the nick-name “Dogheads”, as their pennon featured the silhouette of a typical sheepdog with a\r\nlonger coat at the neck – their faithful home guard.\r\nThe existence of longhaired sheepdogs who were faithful helpers and\r\nguards was also described by the writer A. Jirásek in his novel entitled\r\n“Dog-heads”, illustrated by Mikoás Als. One cannot of course claim that\r\nthe above documents state facts of the origin of the present-day Chodsky\r\nDog. It is simply a historical support for the existence of a well-established\r\ntype of sheepdog with origin in the Czech territory.\r\n', 0, 'BOHEMIAN SHEPHERD DOG.jpg'),
(252, 15, 'CHOW CHOW', 'The ancestry of the Chow is\r\nattributed to China where he was kept as a guard dog, and also used\r\nfor hunting. The Chow has been known in China for upwards of\r\n2,000 years and is related to Spitz dogs of the Nordic type, also\r\ncontaining something of the mastiff. Because of China’s ‘closed\r\ndoor’ policy to the rest of the world Chows did not begin to appear in\r\nother countries until around 1800. He made his way to England\r\nsometime during the late eighteenth century and was not really\r\nnoticed in Britain until the 1920s, with a number being shown at\r\nCrufts in 1925.\r\n', 0, 'CHOW CHOW.jpg'),
(253, 15, 'CIMARRÓN URUGUAYO', 'The origin of the Cimarrón\r\nUruguayo is uncertain. It is known to be descended from the dogs\r\nintroduced by the Spanish and Portuguese conquerors.\r\nThese dogs left in the country crossed among themselves. Natural\r\nselection had as a result that only the fitter, the stronger and more\r\nclever individuals survived. This is how the Cimarrón was born.\r\nThe inhabitants of the time, recognizing the value of these dogs,\r\ndomesticated them and progressively began to use them successfully\r\nas guards of their estates and as herding dogs in their daily work with\r\ncattle. ', 0, 'CIMARRÃN URUGUAYO.jpg'),
(254, 15, 'POMERANIAN', 'German Spitz dogs are\r\ndescendants of the stoneage «Peat Dogs» (Torfhunde) «Canis\r\nfamiliaris palustris Rütimeyer» and the later Lake Dwelling Spitz\r\n(Pfahlbauspitz); it is the oldest breed of dog in Central Europe.\r\nNumerous other breeds have been developed from them. In nonGerman speaking countries Toy Spitz dogs (Zwergspitze) are known\r\nas Pomeranians. ', 0, 'POM.webp');


CREATE TABLE `bre_user` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL DEFAULT '1',
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(150) NOT NULL DEFAULT '',
  `contact_no` varchar(50) NOT NULL DEFAULT '',
  `user_country` varchar(100) NOT NULL DEFAULT '',
  `identification_id_no` varchar(50) NOT NULL DEFAULT '',
  `identification_id_name` varchar(450) NOT NULL DEFAULT '',
  `identity_doc_name` varchar(450) DEFAULT NULL,
  `user_address` varchar(900) NOT NULL DEFAULT '',
  `profile_pic` varchar(450) DEFAULT NULL,
  `user_created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `user_updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_status` enum('1','2','3') NOT NULL DEFAULT '2',
  `reject_reason` varchar(2000) NOT NULL DEFAULT '',
  `user_role_id` int(11) DEFAULT NULL
)


CREATE TABLE `bre_role_master` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bre_role_master`
--

INSERT INTO `bre_role_master` (`role_id`, `role_name`, `role_description`) VALUES
(1, 'breeder', 'breeder'),
(2, 'user', 'user'),
(3, 'admin', 'admin'),
(4, 'company', '');

CREATE TABLE `bre_breeder` (
  `breeder_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `breeder_created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `breeder_updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
)

CREATE TABLE `bre_breeder_farm` (
  `id` int(11) NOT NULL,
  `farm_id` int(11) NOT NULL,
  `animal_type_id` int(11) NOT NULL,
  `breeder_id` int(11) NOT NULL,
  `farm_name` varchar(255) NOT NULL DEFAULT '',
  `farm_address` varchar(255) NOT NULL DEFAULT '',
  `license_no` varchar(50) NOT NULL DEFAULT '',
  `license_doc_name` varchar(50) DEFAULT NULL,
  `license_expiry_date` date DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `registration_no` varchar(256) DEFAULT ''
)

CREATE TABLE `bre_company` (
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `bre_animal_owner_history` (
  `id` int(11) NOT NULL,
  `animal_id` varchar(255) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `is_current_owner` tinyint(4) NOT NULL DEFAULT 1
)

CREATE TABLE `bre_costs_master` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `delivery_fee` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `bre_costs_master` (`id`, `name`, `amount`, `tax`, `delivery_fee`, `description`, `is_deleted`) VALUES
(1, 'Registration of Membership for 1 yrs', 500, 0, 0, 'Registration of Membership for 1 yrs', 0),
(2, 'Farm Name  Registration/Brand Name ownership', 2000, 0, 0, 'Kennel/Cattery/Stud Farm/Dairy Registration', 0),
(3, 'Single / unknown Pedigree  Registration', 500, 0, 100, 'Single / unknown Pedigree Registration', 0),
(4, 'Import / Export Registration', 1000, 0, 100, 'Import Registration', 0),
(5, 'Name Change/ Transfer of ownership', 300, 0, 100, 'Name Change/ Transfer of ownership', 0),
(6, 'Litter registration (1 Puppy registration)', 600, 0, 0, 'Litter registration (1 Puppy registration)', 0);


CREATE TABLE `bre_courses` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL DEFAULT '',
  `syllabus` longtext DEFAULT NULL,
  `fees` int(11) NOT NULL DEFAULT 0,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `image` varchar(256) DEFAULT NULL
)


INSERT INTO `bre_courses` (`id`, `name`, `syllabus`, `fees`, `start_date`, `end_date`, `is_active`, `image`) VALUES
(1, 'Dog Breeding and Kennel Management', '<ul>\r\n<li style=\"text-align:justify;\"><span style=\"color: var(--text-primary);font-size: inherit;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 1-2: Introduction to Dog Breeding</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Overview of Dog Breeds:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Introduction to different breeds, their characteristics, and purposes.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Breeding Ethics and Standards:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Responsible breeding practices.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding and adhering to breed standards.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Reproductive Anatomy and Physiology:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Male and female reproductive systems.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Estrus cycle and breeding timing.</span></li>\r\n</ul>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: inherit;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 3-4: Genetics and Breeding Techniques</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Genetics Basics:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Inheritance patterns.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Common genetic disorders in dogs.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Selective Breeding:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Goals and methods.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Avoiding inbreeding and genetic diversity.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Artificial Insemination and Reproductive Technologies:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Techniques and applications in dog breeding.</span></li>\r\n</ul>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-headings);font-size: medium;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 5-6: Prenatal and Neonatal Care</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Prenatal Care:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Monitoring pregnancy.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Nutrition and care during gestation.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Whelping and Neonatal Care:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Stages of labor.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Care for the newborn puppies.</span></li>\r\n</ul>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: inherit;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 7-8: Health and Nutrition</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Canine Nutrition:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Dietary requirements for breeding dogs.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Puppy and adult dog nutrition.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Health Monitoring:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Preventive healthcare measures.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Identifying and managing common health issues.</span></li>\r\n</ul>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: inherit;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 9-10: Kennel Management</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Facility Design and Maintenance:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Kennel layout and design considerations.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Proper sanitation and waste management.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Record Keeping:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Maintaining breeding and health records.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Pedigree documentation.</span></li>\r\n</ul>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: inherit;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 11-12: Business and Legal Aspects</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Business Planning:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Budgeting and financial management.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Marketing and client relations.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"></li>\r\n</ul>\r\n<p style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Legal Considerations:</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Breeding regulations and licensing.</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Contracts and agreements.</span></li>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: 0.875rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 13-14: Guest Lectures and Case Studies</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Guest Speakers:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Inviting professionals in the field for insights.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Case Studies:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Analyzing successful breeding programs and kennel management.</span></li>\r\n</ul>\r\n</ul>\r\n<h4 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: inherit;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Week 15: Final Project and Review</span></h4>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Final Project:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Developing a breeding plan or kennel management strategy.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"></li>\r\n</ul>\r\n<p style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Course Review:</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Reflecting on key concepts and practical applications.</span></li>\r\n</ul>\r\n<h3 style=\"margin-left:0px;\"><span style=\"color: var(--text-primary);font-size: medium;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Assessment:</span></h3>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Quizzes and Exams:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Assessing theoretical knowledge.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Practical Assignments:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Applying breeding and kennel management skills.</span></li>\r\n</ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Final Project Evaluation:</strong></span></li>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Presentation and documentation.</span></li>\r\n</ul>\r\n</ul>\r\n<h3 style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-headings);font-size: medium;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Note:</span></h3>\r\n<p style=\"margin-left:0px;\"><span style=\"color: var(--tw-prose-body);font-size: 1rem;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">This syllabus is a general guideline and should be adapted based on the specific needs, audience, and resources available for your course. Additionally, it\'s essential to incorporate hands-on experiences, guest speakers, and field visits to enhance the learning experience.</span></p>\r\n<p></p>\r\n<p></p>\r\n<p></p>\r\n<p></p>\r\n<p style=\"text-align:start;\"></p>\r\n<p></p>\r\n<p><br>&nbsp;</p>\r\n', 5000, '2024-04-01', '2024-04-01', 1, 'Untitled (YouTube Thumbnail).png'),
(2, 'Pre-Pet Parenting Session', '<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 1: Introduction to Responsible Pet Ownership</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Overview of the course</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Benefits and challenges of having a pet</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding the commitment involved in pet ownership</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 2: Choosing the Right Pet</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Researching different pet species</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Assessing lifestyle compatibility</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Considering space and financial requirements</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Evaluating time commitments</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 3: Pet Care Basics</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Nutrition: Choosing the right food for different pets</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Grooming and hygiene</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding common health issues</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Regular veterinary care and vaccinations</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 4: Training and Socialization</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Basic training techniques</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Importance of socialization</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Positive reinforcement methods</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Addressing behavioral issues</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 5: Creating a Pet-Friendly Environment</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Setting up a safe and comfortable home</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Importance of pet-proofing</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Indoor and outdoor considerations</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Providing mental and physical stimulation</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 6: Legal and Ethical Considerations</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding local pet ownership laws</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Licensing and identification</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Ethical considerations in pet ownership</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Pet insurance and emergency preparedness</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 7: Financial Planning for Pet Ownership</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Budgeting for pet expenses</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Unexpected costs and emergency funds</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Pet insurance options</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Long-term financial planning</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 8: Time Management and Work-Life Balance</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Balancing work, social life, and pet responsibilities</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Creating a daily routine for your pet</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Time-saving tips for busy pet parents</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 9: Building a Support System</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Importance of a strong support network</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Finding local pet communities</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Pet care resources and organizations</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Creating a relationship with a veterinarian</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 10: Final Project and Graduation</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Applying the knowledge gained in the course</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Developing a personalized pet care plan</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Graduation ceremony and certificates</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">This syllabus covers a range of essential topics to ensure that prospective pet owners are well-prepared for the responsibilities and joys of pet parenthood. Adjustments can be made based on the specific needs and preferences of the participants.</span>&nbsp;</p>\r\n', 1200, '2024-05-01', '2024-05-03', 1, 'Untitled (YouTube Thumbnail) (1).png');
INSERT INTO `bre_courses` (`id`, `name`, `syllabus`, `fees`, `start_date`, `end_date`, `is_active`, `image`) VALUES
(3, 'Kennel Management Staff Education Program', '<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 1: Introduction to Kennel Management</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Overview of kennel operations</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding the role of kennel staff</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Importance of animal welfare and ethical considerations</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 2: Kennel Facility Design and Maintenance</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Design principles for kennel facilities</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Proper sanitation and hygiene practices</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Equipment and technology used in kennel management</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 3: Animal Behavior and Handling</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding animal behavior</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Safe and effective animal handling techniques</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Recognizing and managing stress in animals</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 4: Health and Nutrition</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Basics of animal health and common illnesses</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Nutrition requirements for various species</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Preventative healthcare measures</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 5: Record Keeping and Documentation</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Importance of accurate record-keeping</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Creating and maintaining detailed animal records</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Legal and regulatory documentation requirements</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 6: Staff Training and Leadership</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Training programs for kennel staff</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Effective communication and leadership skills</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Conflict resolution and team building</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 7: Customer Service and Client Relations</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Interacting with pet owners and clients</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Addressing customer concerns and feedback</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Marketing and promoting kennel services</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 8: Emergency Preparedness and Safety</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Developing emergency plans for various scenarios</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">First aid and emergency medical procedures</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Ensuring a safe environment for both staff and animals</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 9: Legal and Ethical Considerations</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding relevant laws and regulations</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Ethical considerations in animal care and management</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Liability and risk management</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Module 10: Industry Trends and Professional Development</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Staying updated on industry trends</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Continuing education opportunities</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Networking and professional development</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Practical Training and Internship:</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Hands-on experience in a kennel or animal care facility</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Applying theoretical knowledge in real-world scenarios</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Mentored training in various aspects of kennel management</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Keep in mind that this is a general guideline, and specific programs may include additional topics or tailor the content to meet the needs of the particular course or institution. Always refer to the syllabus provided by your educational institution for the most accurate and detailed information.</span>&nbsp;</p>\r\n', 5000, '2024-04-10', '2024-04-10', 1, 'Untitled (YouTube Thumbnail) (2).png'),
(4, 'Dog Diet and Grooming Management Program', '<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Course Description:</strong><br>This program is designed to provide students with comprehensive knowledge and practical skills in managing the diet and grooming of dogs. Topics covered include nutrition fundamentals, dietary requirements for different breeds, grooming techniques, and overall wellness. The course combines theoretical concepts with hands-on activities to ensure students are well-equipped to care for dogs\' health and appearance.</span></p>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 1-2: Introduction to Dog Nutrition</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding the basic nutritional needs of dogs</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Differentiating between commercial dog food types</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Introduction to raw and homemade dog diets</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Assessing individual dietary requirements based on breed, age, and health</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 3-4: Canine Dietary Health</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Common health issues related to diet</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Special dietary considerations for puppies, adult dogs, and seniors</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Nutritional supplements and their role in dog health</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Reading and interpreting dog food labels</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 5-6: Grooming Essentials</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Importance of grooming for dog health and well-being</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Tools and equipment for grooming</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Bathing techniques and choosing appropriate shampoos</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Brushing and detangling fur</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 7-8: Breed-Specific Grooming</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Understanding the grooming needs of different dog breeds</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Tailoring grooming techniques to specific coat types</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Grooming for short-haired, long-haired, and curly-haired breeds</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Addressing specific grooming challenges for breeds like poodles, terriers, etc.</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 9-10: Skin and Coat Health</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Recognizing signs of skin and coat issues</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Preventive measures for maintaining healthy skin and coat</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Dealing with common skin problems</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Role of diet in promoting skin and coat health</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Week 11-12: Practical Applications and Hands-on Training</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Demonstrations and hands-on practice in grooming techniques</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Creating customized diet plans for dogs</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Guest speakers from the industry to share real-world experiences</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Q&amp;A sessions for troubleshooting common grooming and dietary challenges</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Assessment:</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Class participation and engagement</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Written assignments and quizzes</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Practical demonstrations and hands-on assessments</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Final project: Designing a personalized diet and grooming plan for a specific dog breed</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Textbook:</strong><br>\"Dog Nutrition and Grooming Guide\" by [Author]</span></p>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Additional Resources:</strong></span></p>\r\n<ul>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Online articles and videos on specific grooming techniques</span></li>\r\n<li style=\"margin-left:0px;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">Scientific journals on canine nutrition</span></li>\r\n</ul>\r\n<p style=\"text-align:start;\"><span style=\"color: rgb(55,65,81);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif, \"Helvetica Neue\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>Note:</strong><br>This syllabus is a general guideline, and adjustments can be made based on the needs of the students and any updates in the field of dog nutrition and grooming. The practical component is essential for ensuring students gain hands-on experience in applying the concepts learned during the course.</span>&nbsp;</p>\r\n', 5000, '2024-04-20', '2024-04-20', 1, 'Untitled (YouTube Thumbnail) (3).png');


CREATE TABLE `bre_farm_master` (
  `farm_id` int(11) NOT NULL,
  `farm_name` varchar(50) NOT NULL DEFAULT '',
  `farm_description` varchar(150) NOT NULL DEFAULT '',
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bre_farm_master`
--

INSERT INTO `bre_farm_master` (`farm_id`, `farm_name`, `farm_description`, `is_deleted`) VALUES
(1, 'KENNEL', '', 0),
(2, 'CATTERY', '', 0),
(3, 'STUD', '', 0),
(4, 'DAIRY', '', 0);

CREATE TABLE `bre_litters` (
  `id` int(11) NOT NULL,
  `litter_name` varchar(250) NOT NULL,
  `litter_color_mark` varchar(250) NOT NULL,
  `litter_gender` varchar(250) NOT NULL,
  `litter_registration_id` int(11) NOT NULL
)

CREATE TABLE `bre_litter_registration` (
  `id` int(11) NOT NULL,
  `dob` date NOT NULL,
  `meeting_date` date NOT NULL,
  `meeting_time` varchar(255) NOT NULL,
  `sire_id` varchar(255) DEFAULT NULL,
  `dam_id` varchar(255) NOT NULL,
  `mating_date` date NOT NULL,
  `owner_id` int(11) NOT NULL,
  `sire_owner_id` int(11) DEFAULT NULL,
  `remarks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`remarks`)),
  `sire_approval` tinyint(4) NOT NULL DEFAULT 0,
  `sire_rejection_reason` varchar(255) DEFAULT NULL,
  `sire_action_taken` tinyint(4) DEFAULT NULL,
  `sire_action_time` datetime DEFAULT NULL,
  `completed` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `semen_bill` varchar(256) DEFAULT NULL,
  `vet_certificate` varchar(256) DEFAULT NULL,
  `is_semen` tinyint(1) DEFAULT 0
)


CREATE TABLE `bre_orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `receipt` varchar(255) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL,
  `billing_address` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `cost_id` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL DEFAULT '',
  `razorpay_payment_id` varchar(255) NOT NULL DEFAULT '',
  `razorpay_order_id` varchar(255) NOT NULL DEFAULT '',
  `razorpay_signature` varchar(255) NOT NULL DEFAULT '',
  `status` enum('0','1','2') NOT NULL DEFAULT '2',
  `failure_reason` varchar(255) DEFAULT NULL,
  `failure_description` varchar(255) DEFAULT NULL
)


CREATE TABLE `bre_transfer_farm_request` (
  `transfer_id` int(11) NOT NULL,
  `request_created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `request_completed_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `request_status` varchar(255) NOT NULL DEFAULT 'In progress',
  `request_rejection_reason` varchar(500) DEFAULT NULL,
  `old_owner_id` int(11) DEFAULT NULL,
  `new_owner_id` int(11) DEFAULT NULL,
  `farm_id` int(11) DEFAULT NULL
)

CREATE TABLE `bre_transfer_owner_request` (
  `transfer_id` int(11) NOT NULL,
  `request_created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `request_Completed_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `request_status` varchar(255) NOT NULL DEFAULT 'In progress',
  `request_rejection_reason` varchar(500) DEFAULT NULL,
  `old_owner_id` int(11) DEFAULT NULL,
  `new_owner_id` int(11) DEFAULT NULL,
  `animal_id` varchar(36) DEFAULT NULL
)



CREATE TABLE `bre_user_courses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_method` varchar(256) DEFAULT NULL,
  `payment_status` enum('0','1','2') DEFAULT '1',
  `receipt` varchar(256) DEFAULT NULL,
  `order_id` varchar(256) DEFAULT NULL,
  `payment_failure_reason` varchar(256) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
)

CREATE TABLE `bre_user_subscription` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subscription_start_date` datetime NOT NULL,
  `subscription_end_date` datetime NOT NULL,
  `subscription_created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `subscription_updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `amount_paid` int(11) NOT NULL DEFAULT 0,
  `subscription_active` tinyint(4) NOT NULL DEFAULT 1,
  `order_id` int(11) NOT NULL
)


ALTER TABLE `bre_animal`
  ADD PRIMARY KEY (`animal_id`),
  ADD KEY `FK_5cd1c566d6b601ae21cccb88ba3` (`animal_type_id`),
  ADD KEY `FK_9e02f2b74cb340cee4258cd8a81` (`animal_breed_id`),
  ADD KEY `FK_6f6932fe705fa966206ace4127a` (`animal_owner_id`);

--
-- Indexes for table `bre_animal_breed_master`
--
ALTER TABLE `bre_animal_breed_master`
  ADD PRIMARY KEY (`animal_breed_id`),
  ADD KEY `FK_80c58e37f491c33fe704a30c810` (`animal_type_id`);

--
-- Indexes for table `bre_animal_master`
--
ALTER TABLE `bre_animal_master`
  ADD PRIMARY KEY (`animal_type_id`);

--
-- Indexes for table `bre_animal_owner_history`
--
ALTER TABLE `bre_animal_owner_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8ccc227fdf86905d933345e8d47` (`animal_id`),
  ADD KEY `FK_0e7551aa8e14bef398c13ca0c89` (`owner_id`);

--
-- Indexes for table `bre_breeder`
--
ALTER TABLE `bre_breeder`
  ADD PRIMARY KEY (`breeder_id`),
  ADD UNIQUE KEY `REL_360c1615118a61c301a7004d71` (`user_id`);

--
-- Indexes for table `bre_breeder_farm`
--
ALTER TABLE `bre_breeder_farm`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_3a856e8fc998a2deb56549727f` (`license_no`),
  ADD KEY `FK_cad822eaa4708944a5d9502f6d8` (`farm_id`),
  ADD KEY `FK_c93e4df52145641f5c3adc39830` (`animal_type_id`),
  ADD KEY `FK_aa58f8120007824c6c9873f1f71` (`breeder_id`);

--
-- Indexes for table `bre_company`
--
ALTER TABLE `bre_company`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bre_costs_master`
--
ALTER TABLE `bre_costs_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bre_courses`
--
ALTER TABLE `bre_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bre_farm_master`
--
ALTER TABLE `bre_farm_master`
  ADD PRIMARY KEY (`farm_id`);

--
-- Indexes for table `bre_litters`
--
ALTER TABLE `bre_litters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dcef32f3955874f52c99c6ce72d` (`litter_registration_id`);

--
-- Indexes for table `bre_litter_registration`
--
ALTER TABLE `bre_litter_registration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_85e906894fb774e202c4b806aaf` (`sire_id`),
  ADD KEY `FK_49ad6c0c44354a9b43cbeabd991` (`dam_id`),
  ADD KEY `FK_36b1bb427489f89e0b5b59510ab` (`owner_id`),
  ADD KEY `FK_3a4443a160c780e65ae83cf0c2e` (`sire_owner_id`);

--
-- Indexes for table `bre_orders`
--
ALTER TABLE `bre_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bre_role_master`
--
ALTER TABLE `bre_role_master`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `bre_transfer_farm_request`
--
ALTER TABLE `bre_transfer_farm_request`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `FK_old_owner` (`old_owner_id`),
  ADD KEY `FK_new_owner` (`new_owner_id`);

--
-- Indexes for table `bre_transfer_owner_request`
--
ALTER TABLE `bre_transfer_owner_request`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `FK_4745720d08c39d04ca28bcac143` (`old_owner_id`),
  ADD KEY `FK_a1cf1dce27afc19057b5b7263a5` (`new_owner_id`),
  ADD KEY `FK_06888907f918c48d9345dd07ef4` (`animal_id`);

--
-- Indexes for table `bre_user`
--
ALTER TABLE `bre_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_284703935593bc7b708c70ff06` (`email`),
  ADD UNIQUE KEY `IDX_1d51d38c9df5ee6414fcd466a5` (`contact_no`),
  ADD UNIQUE KEY `IDX_d1b47d67e4dcbd8e9dc67b0686` (`identification_id_no`),
  ADD KEY `FK_89d326e530743802db410fa18d6` (`user_role_id`);

--
-- Indexes for table `bre_user_courses`
--
ALTER TABLE `bre_user_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_course` (`user_id`),
  ADD KEY `FK_course_user` (`course_id`);

--
-- Indexes for table `bre_user_subscription`
--
ALTER TABLE `bre_user_subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_39a34497da9b8cf2c6822c56ac` (`order_id`),
  ADD KEY `FK_4c668ed44f4efc21342038ebc05` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bre_animal_breed_master`
--
ALTER TABLE `bre_animal_breed_master`
  MODIFY `animal_breed_id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_animal_master`
--
ALTER TABLE `bre_animal_master`
  MODIFY `animal_type_id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_animal_owner_history`
--
ALTER TABLE `bre_animal_owner_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_breeder`
--
ALTER TABLE `bre_breeder`
  MODIFY `breeder_id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_breeder_farm`
--
ALTER TABLE `bre_breeder_farm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_company`
--
ALTER TABLE `bre_company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_costs_master`
--
ALTER TABLE `bre_costs_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_courses`
--
ALTER TABLE `bre_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_farm_master`
--
ALTER TABLE `bre_farm_master`
  MODIFY `farm_id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_litters`
--
ALTER TABLE `bre_litters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_litter_registration`
--
ALTER TABLE `bre_litter_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_orders`
--
ALTER TABLE `bre_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_role_master`
--
ALTER TABLE `bre_role_master`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_transfer_farm_request`
--
ALTER TABLE `bre_transfer_farm_request`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_transfer_owner_request`
--
ALTER TABLE `bre_transfer_owner_request`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_user`
--
ALTER TABLE `bre_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `bre_user_courses`
--
ALTER TABLE `bre_user_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bre_user_subscription`
--
ALTER TABLE `bre_user_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;



ALTER TABLE `bre_animal`
  ADD CONSTRAINT `FK_5cd1c566d6b601ae21cccb88ba3` FOREIGN KEY (`animal_type_id`) REFERENCES `bre_animal_master` (`animal_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6f6932fe705fa966206ace4127a` FOREIGN KEY (`animal_owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9e02f2b74cb340cee4258cd8a81` FOREIGN KEY (`animal_breed_id`) REFERENCES `bre_animal_breed_master` (`animal_breed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_animal_breed_master`
--
ALTER TABLE `bre_animal_breed_master`
  ADD CONSTRAINT `FK_80c58e37f491c33fe704a30c810` FOREIGN KEY (`animal_type_id`) REFERENCES `bre_animal_master` (`animal_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_animal_owner_history`
--
ALTER TABLE `bre_animal_owner_history`
  ADD CONSTRAINT `FK_0e7551aa8e14bef398c13ca0c89` FOREIGN KEY (`owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8ccc227fdf86905d933345e8d47` FOREIGN KEY (`animal_id`) REFERENCES `bre_animal` (`animal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_breeder`
--
ALTER TABLE `bre_breeder`
  ADD CONSTRAINT `FK_360c1615118a61c301a7004d71c` FOREIGN KEY (`user_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_breeder_farm`
--
ALTER TABLE `bre_breeder_farm`
  ADD CONSTRAINT `FK_aa58f8120007824c6c9873f1f71` FOREIGN KEY (`breeder_id`) REFERENCES `bre_breeder` (`breeder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c93e4df52145641f5c3adc39830` FOREIGN KEY (`animal_type_id`) REFERENCES `bre_animal_master` (`animal_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cad822eaa4708944a5d9502f6d8` FOREIGN KEY (`farm_id`) REFERENCES `bre_farm_master` (`farm_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_company`
--
ALTER TABLE `bre_company`
  ADD CONSTRAINT `bre_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_litters`
--
ALTER TABLE `bre_litters`
  ADD CONSTRAINT `FK_dcef32f3955874f52c99c6ce72d` FOREIGN KEY (`litter_registration_id`) REFERENCES `bre_litter_registration` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_litter_registration`
--
ALTER TABLE `bre_litter_registration`
  ADD CONSTRAINT `FK_36b1bb427489f89e0b5b59510ab` FOREIGN KEY (`owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_3a4443a160c780e65ae83cf0c2e` FOREIGN KEY (`sire_owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_49ad6c0c44354a9b43cbeabd991` FOREIGN KEY (`dam_id`) REFERENCES `bre_animal` (`animal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_85e906894fb774e202c4b806aaf` FOREIGN KEY (`sire_id`) REFERENCES `bre_animal` (`animal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_transfer_farm_request`
--
ALTER TABLE `bre_transfer_farm_request`
  ADD CONSTRAINT `FK_new_owner` FOREIGN KEY (`new_owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_old_owner` FOREIGN KEY (`old_owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_transfer_owner_request`
--
ALTER TABLE `bre_transfer_owner_request`
  ADD CONSTRAINT `FK_06888907f918c48d9345dd07ef4` FOREIGN KEY (`animal_id`) REFERENCES `bre_animal` (`animal_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4745720d08c39d04ca28bcac143` FOREIGN KEY (`old_owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a1cf1dce27afc19057b5b7263a5` FOREIGN KEY (`new_owner_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_user`
--
ALTER TABLE `bre_user`
  ADD CONSTRAINT `FK_89d326e530743802db410fa18d6` FOREIGN KEY (`user_role_id`) REFERENCES `bre_role_master` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bre_user_courses`
--
ALTER TABLE `bre_user_courses`
  ADD CONSTRAINT `FK_course_user` FOREIGN KEY (`course_id`) REFERENCES `bre_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_user_course` FOREIGN KEY (`user_id`) REFERENCES `bre_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bre_user_subscription`
--
ALTER TABLE `bre_user_subscription`
  ADD CONSTRAINT `FK_39a34497da9b8cf2c6822c56acd` FOREIGN KEY (`order_id`) REFERENCES `bre_orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4c668ed44f4efc21342038ebc05` FOREIGN KEY (`user_id`) REFERENCES `bre_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
