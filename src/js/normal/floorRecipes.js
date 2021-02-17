import { Floor } from '../classes/floor';

export function getFloorRecipes(){
    var floorRecipes = new Map();

    const mayhemReq = [["Wood", 14],
                        ["String", 18],
                        ["Ribbon", 6],
                    ];
    const mayhem = new Floor("Mayhem", 4, mayhemReq);
    floorRecipes.set(mayhem.name, mayhem);
    
    const beachReq = [["Wood", 8],
                        ["String", 18],
                        ["Ribbon", 17],
                    ];
    const beach = new Floor("Beach", 5, beachReq);
    floorRecipes.set(beach.name, beach);
    
    const farmReq = [["String", 5],
                        ["Wood", 11],
                        ["Needles", 4],
                        ["Metal", 23],
                        ["Sparkles", 1],
                        ["Ribbon", 1],
                    ];
    const farm = new Floor("Farm", 6, farmReq);
    floorRecipes.set(farm.name, farm);
    
    const plantReq = [["Ribbon", 6],
                        ["String", 6],
                        ["Wood", 14],
                        ["Metal", 15],
                        ["Needles", 6],
                        ["Sparkles", 1],
                    ];
    const plant = new Floor("Plant", 7, plantReq);
    floorRecipes.set(plant.name, plant);
    
    const forestReq = [["Wood", 7],
                        ["String", 7],
                        ["Needles", 5],
                        ["Ribbon", 8],
                        ["Metal", 9],
                        ["Sparkles", 2],
                    ];
    const forest = new Floor("Forest", 8, forestReq);
    floorRecipes.set(forest.name, forest);
    
    const dessertReq = [["Ribbon", 14],
                        ["Metal", 20],
                        ["Needles", 7],
                        ["Sparkles", 4],
                    ];
    const dessert = new Floor("Dessert", 9, dessertReq);
    floorRecipes.set(dessert.name, dessert);
    
    const dreamReq = [["Wood", 2],
                        ["Needles", 11],
                        ["Sparkles", 5],
                        ["Metal", 3],
                        ["Ribbon", 6],
                        ["Bronze", 8],
                        ["Silver", 1],
                    ];
    const dream = new Floor("Dream", 10, dreamReq);
    floorRecipes.set(dream.name, dream);
    
    const woodsReq = [["Wood", 6],
                        ["Needles", 7],
                        ["Bronze", 9],
                        ["Metal", 5],
                        ["Sparkles", 4],
                        ["Ribbon", 4],
                        ["Silver", 3],
                        ["Gold", 1],
                    ];
    const woods = new Floor("Woods", 11, woodsReq);
    floorRecipes.set(woods.name, woods);
    
    const galacticReq = [["String", 19],
                        ["Wood", 11],
                        ["Ribbon", 16],
                        ["Needles", 11],
                        ["Sparkles", 8],
                        ["Bronze", 7],
                        ["Silver", 5],
                    ];
    const galactic = new Floor("Galactic", 12, galacticReq);
    floorRecipes.set(galactic.name, galactic);
    
    const eightiesReq = [["Wood", 18],
                        ["Metal", 12],
                        ["Ribbon", 15],
                        ["Needles", 10],
                        ["Sparkles", 9],
                        ["Silver", 6],
                        ["Gold", 1],
                    ];
    const eighties = new Floor("Eighties", 13, eightiesReq);
    floorRecipes.set(eighties.name, eighties);
    
    const oasisReq = [["Needles", 10],
                        ["Ribbon", 18],
                        ["Silver", 10],
                        ["Gold", 3],
                        ["Sparkles", 2],
                    ];
    const oasis = new Floor("Oasis", 14, oasisReq);
    floorRecipes.set(oasis.name, oasis);
    
    const reefReq = [["Needles", 19],
                        ["Ribbon", 3],
                        ["Silver", 16],
                        ["Gold", 2],
                        ["Amethyst", 1],
                        ["Pendant", 2],
                    ];
    const reef = new Floor("Reef", 15, reefReq);
    floorRecipes.set(reef.name, reef);
    
    const gardenReq = [["Needles", 15],
                        ["Ribbon", 5],
                        ["Silver", 5],
                        ["Gold", 3],
                        ["Sparkles", 5],
                        ["Amethyst", 10],
                        ["Pendant", 4],
                    ];
    const garden = new Floor("Garden", 16, gardenReq);
    floorRecipes.set(garden.name, garden);
    
    const nightmareReq = [["Needles", 1],
                        ["Ribbon", 3],
                        ["Silver", 14],
                        ["Gold", 3],
                        ["Sparkles", 4],
                        ["Amethyst", 5],
                        ["Pendant", 4],
                    ];
    const nightmare = new Floor("Nightmare", 17, nightmareReq);
    floorRecipes.set(nightmare.name, nightmare);
    
    const oceanReq = [["Needles", 7],
                        ["Ribbon", 4],
                        ["Silver", 11],
                        ["Gold", 6],
                        ["Sparkles", 6],
                        ["Pendant", 2],
                    ];
    const ocean = new Floor("Ocean", 18, oceanReq);
    floorRecipes.set(ocean.name, ocean);
    
    const pyramidReq = [["Needles", 19],
                        ["Bronze", 20],
                        ["Gold", 4],
                        ["Amethyst", 18],
                        ["Sparkles", 4],
                        ["Pendant", 7],
                    ];
    const pyramid = new Floor("Pyramid", 19, pyramidReq);
    floorRecipes.set(pyramid.name, pyramid);
    
    const cakeReq = [["Needles", 7],
                        ["Silver", 5],
                        ["Gold", 1],
                        ["Orb", 8],
                        ["Amethyst", 1],
                        ["Pendant", 3],
                        ["Water", 7],
                        ["Fire", 4],
                    ];
    const cake = new Floor("Cake", 20, cakeReq);
    floorRecipes.set(cake.name, cake);
    
    const interstellarReq = [["Needles", 3],
                        ["Orb", 5],
                        ["Silver", 8],
                        ["Sparkles", 8],
                        ["Pendant", 4],
                        ["Water", 4],
                        ["Fire", 4],
                    ];
    const interstellar = new Floor("Interstellar", 21, interstellarReq);
    floorRecipes.set(interstellar.name, interstellar);
    
    const punkReq = [["Needles", 3],
                        ["Ribbon", 3],
                        ["Sparkles", 4],
                        ["Silver", 7],
                        ["Pendant", 2],
                        ["Water", 10],
                        ["Fire", 2],
                        ["Necklace", 1],
                    ];
    const punk = new Floor("Punk", 22, punkReq);
    floorRecipes.set(punk.name, punk);
    
    const africanReq = [["Water", 10],
                        ["Sparkles", 9],
                        ["Silver", 7],
                        ["Amethyst", 10],
                        ["Gold", 7],
                        ["Pendant", 1],
                    ];
    const african = new Floor("African", 23, africanReq);
    floorRecipes.set(african.name, african);
    
    
    const professionReq = [["Ribbon", 5],
                        ["Amethyst", 6],
                        ["Sparkles", 3],
                        ["Gold", 1],
                        ["Water", 8],
                        ["Fire", 3],
                        ["Waterstone", 6],
                        ["Firestone", 1],
                    ];
    const profession = new Floor("Profession", 24, professionReq);
    floorRecipes.set(profession.name, profession);
    
    const bugsReq = [["Ribbon", 9],
                        ["Amethyst", 18],
                        ["Sparkles", 4],
                        ["Needles", 12],
                        ["Silver", 4],
                        ["Gold", 2],
                        ["Water", 4],
                        ["Fire", 2],
                        ["Pendant", 1],
                        ["Waterstone", 4],
                        ["Firestone", 1],
                    ];
    const bugs = new Floor("Bugs", 25, bugsReq);
    floorRecipes.set(bugs.name, bugs);
    
    const winterReq = [["Ribbon", 7],
                        ["Amethyst", 9],
                        ["Sparkles", 6],
                        ["Needles", 11],
                        ["Silver", 6],
                        ["Water", 5],
                        ["Fire", 3],
                        ["Pendant", 3],
                        ["Waterstone", 5],
                        ["Orb", 8],
                    ];
    const winter = new Floor("Winter", 26, winterReq);
    floorRecipes.set(winter.name, winter);
    
    const springReq = [["Orb", 8],
                        ["Amethyst", 10],
                        ["Water", 8],
                        ["Needles", 3],
                        ["Gold", 4],
                        ["Fire", 1],
                        ["Pendant", 4],
                        ["Waterstone", 2],
                        ["Firestone", 1],
                        ["Elementstone", 1],
                    ];
    const spring = new Floor("Spring", 27, springReq);
    floorRecipes.set(spring.name, spring);
    
    const autumnReq = [["Sparkles", 10],
                        ["Amethyst", 7],
                        ["Water", 3],
                        ["Fire", 2],
                        ["Silver", 5],
                        ["Waterstone", 4],
                        ["Firestone", 3],
                        ["Elementstone", 1],
                    ];
    const autumn = new Floor("Autumn", 28, autumnReq);
    floorRecipes.set(autumn.name, autumn);
    
    const schoolReq = [["Needles", 14],
                        ["Orb", 13],
                        ["Water", 4],
                        ["Fire", 1],
                        ["Waterstone", 4],
                        ["Elementstone", 2],
                        ["Pendant", 1],
                        ["Sparkles", 7],
                        ["Firestone", 2],
                    ];
    const school = new Floor("School", 29, schoolReq);
    floorRecipes.set(school.name, school);
    
    const dogsReq = [["Water", 6],
                        ["Sparkles", 3],
                        ["Orb", 7],
                        ["Fire", 3],
                        ["Firestone", 1],
                        ["Needles", 10],
                        ["Waterstone", 2],
                        ["Elementstone", 1],
                        ["Necklace", 1],
                        ["Pendant", 3],
                    ];
    const dogs = new Floor("Dogs", 30, dogsReq);
    floorRecipes.set(dogs.name, dogs);
    
    const dinerReq = [["Water", 4],
                        ["Sparkles", 4],
                        ["Needles", 2],
                        ["Silver", 3],
                        ["Firestone", 4],
                        ["Waterstone", 3],
                        ["Pendant", 3],
                        ["Elementstone", 2],
                    ];
    const diner = new Floor("Diner", 31, dinerReq);
    floorRecipes.set(diner.name, diner);
    
    const sportsReq = [["Water", 7],
                        ["Needles", 5],
                        ["Sparkles", 12],
                        ["Pendant", 1],
                        ["Firestone", 1],
                        ["Fire", 4],
                        ["Waterstone", 2],
                        ["Elementstone", 1],
                        ["Necklace", 1],
                    ];
    const sports = new Floor("Sports", 32, sportsReq);
    floorRecipes.set(sports.name, sports);
    
    const desertReq = [["Water", 8],
                        ["Sparkles", 9],
                        ["Silver", 2],
                        ["Orb", 8],
                        ["Needles", 6],
                        ["Gold", 2],
                        ["Elementstone", 2],
                        ["Pendant", 4],
                        ["Waterstone", 2],
                        ["Firestone", 2],
                    ];
    const desert = new Floor("Desert", 33, desertReq);
    floorRecipes.set(desert.name, desert);
    
    const dinosaursReq = [["Water", 4],
                        ["Sparkles", 12],
                        ["Silver", 8],
                        ["Orb", 1],
                        ["Needles", 5],
                        ["Pendant", 1],
                        ["Fire", 5],
                        ["Elementstone", 1],
                        ["Waterstone", 3],
                        ["Firestone", 2],
                    ];
    const dinosaurs = new Floor("Dinosaurs", 34, dinosaursReq);
    floorRecipes.set(dinosaurs.name, dinosaurs);
    
    const hairSalonReq = [["Water", 16],
                        ["Sparkles", 8],
                        ["Silver", 7],
                        ["Orb", 10],
                        ["Pendant", 6],
                        ["Ribbon", 8],
                        ["Fire", 2],
                        ["Elementstone", 1],
                        ["Necklace", 1],
                    ];
    const hairSalon = new Floor("Hair Salon", 35, hairSalonReq);
    floorRecipes.set(hairSalon.name, hairSalon);
    
    const heavyMetalReq = [["Orb", 14],
                        ["Water", 6],
                        ["Sparkles", 4],
                        ["Silver", 4],
                        ["Pendant", 4],
                        ["Fire", 1],
                        ["Elementstone", 2],
                        ["Firestone", 4],
                        ["Waterstone", 3],
                    ];
    const heavyMetal = new Floor("Heavy Metal", 36, heavyMetalReq);
    floorRecipes.set(heavyMetal.name, heavyMetal);
    
    const westernReq = [["Needles", 4],
                        ["Water", 11],
                        ["Sparkles", 2],
                        ["Silver", 2],
                        ["Fire", 3],
                        ["Elementstone", 1],
                        ["Firestone", 5],
                        ["Waterstone", 4],
                    ];
    const western = new Floor("Western", 37, westernReq);
    floorRecipes.set(western.name, western);
    
    const racingReq = [["Ribbon", 8],
                        ["Water", 1],
                        ["Sparkles", 15],
                        ["Silver", 16],
                        ["Pendant", 2],
                        ["Fire", 1],
                        ["Elementstone", 2],
                        ["Firestone", 2],
                        ["Waterstone", 6],
                    ];
    const racing = new Floor("Racing", 38, racingReq);
    floorRecipes.set(racing.name, racing);
    
    const mysteryMansionReq = [["Orb", 7],
                        ["Water", 2],
                        ["Sparkles", 7],
                        ["Gold", 6],
                        ["Pendant", 6],
                        ["Fire", 4],
                        ["Firestone", 4],
                        ["Waterstone", 3],
                    ];
    const mysteryMansion = new Floor("Mystery Mansion", 39, mysteryMansionReq);
    floorRecipes.set(mysteryMansion.name, mysteryMansion);
    
    const stationeryReq = [["Gold", 6],
                        ["Water", 6],
                        ["Sparkles", 3],
                        ["Silver", 2],
                        ["Pendant", 2],
                        ["Fire", 5],
                        ["Elementstone", 1],
                        ["Firestone", 3],
                        ["Waterstone", 4],
                    ];
    const stationery = new Floor("Stationery", 40, stationeryReq);
    floorRecipes.set(stationery.name, stationery);
    
    const magicShowReq = [["Orb", 18],
                        ["Needles", 16],
                        ["Water", 4],
                        ["Fire", 7],
                        ["Necklace", 1],
                        ["Elementstone", 1],
                        ["Firestone", 4],
                        ["Waterstone", 4],
                    ];
    const magicShow = new Floor("Magic Show", 41, magicShowReq);
    floorRecipes.set(magicShow.name, magicShow);
    
    const campingReq = [["Sparkles", 3],
                        ["Orb", 8],
                        ["Pendant", 1],
                        ["Needles", 3],
                        ["Silver", 10],
                        ["Fire", 2],
                        ["Elementstone", 2],
                        ["Firestone", 6],
                        ["Waterstone", 5],
                    ];
    const camping = new Floor("Camping", 42, campingReq);
    floorRecipes.set(camping.name, camping);
    
    const plushReq = [["Gold", 2],
                        ["Orb", 15],
                        ["Needles", 9],
                        ["Water", 10],
                        ["Fire", 4],
                        ["Silver", 12],
                        ["Firestone", 5],
                        ["Waterstone", 6],
                    ];
    const plush = new Floor("Plush", 43, plushReq);
    floorRecipes.set(plush.name, plush);
    
    const roleplayReq = [["Gold", 2],
                        ["Orb", 12],
                        ["Pendant", 4],
                        ["Silver", 5],
                        ["Fire", 2],
                        ["Water", 4],
                        ["Firestone", 3],
                        ["Waterstone", 2],
                        ["Elementstone", 4],
                    ];
    const roleplay = new Floor("Roleplay", 44, roleplayReq);
    floorRecipes.set(roleplay.name, roleplay);
    
    const bathroomReq = [["Pendant", 1],
                        ["Orb", 14],
                        ["Water", 8],
                        ["Fire", 4],
                        ["Waterstone", 8],
                        ["Firestone", 4],
                        ["Necklace", 2],
                    ];
    const bathroom = new Floor("Bathroom", 45, bathroomReq);
    floorRecipes.set(bathroom.name, bathroom);
    
    const jungleReq = [["Pendant", 2],
                        ["Gold", 2],
                        ["Water", 4],
                        ["Fire", 7],
                        ["Elementstone", 1],
                        ["Waterstone", 7],
                        ["Firestone", 7],
                    ];
    const jungle = new Floor("Jungle", 46, jungleReq);
    floorRecipes.set(jungle.name, jungle);
    
    const skateParkReq = [["Pendant", 2],
                        ["Orb", 16],
                        ["Fire", 2],
                        ["Elementstone", 3],
                        ["Waterstone", 9],
                        ["Firestone", 6],
                    ];
    const skatePark = new Floor("Skate Park", 47, skateParkReq);
    floorRecipes.set(skatePark.name, skatePark);
    
    const arcticReq = [["Pendant", 4],
                        ["Orb", 16],
                        ["Waterstone", 4],
                        ["Firestone", 4],
                        ["Elementstone", 1],
                        ["Necklace", 2],
                        ["Water", 3],
                        ["Artifact", 1],
                    ];
    const arctic = new Floor("Arctic", 48, arcticReq);
    floorRecipes.set(arctic.name, arctic);
    
    const detectiveReq = [["Pendant", 10],
                        ["Gold", 5],
                        ["Silver", 2],
                        ["Water", 6],
                        ["Waterstone", 6],
                        ["Fire", 4],
                        ["Necklace", 2],
                    ];
    const detective = new Floor("Detective", 49, detectiveReq);
    floorRecipes.set(detective.name, detective);
    
    const catGameDevReq = [["Pendant", 4],
                        ["Orb", 18],
                        ["Necklace", 1],
                        ["Water", 5],
                        ["Fire", 5],
                        ["Waterstone", 7],
                        ["Elementstone", 2],
                        ["Firestone", 3],
                    ];
    const catGameDev = new Floor("Cat Game Dev", 50, catGameDevReq);
    floorRecipes.set(catGameDev.name, catGameDev);
    
    const cruiseReq = [["Pendant", 2],
                    ["Water", 18],
                    ["Fire", 12],
                    ["Waterstone", 8],
                    ["Firestone", 3],
                    ["Necklace", 1],
                    ];
    const cruise = new Floor("Cruise", 51, cruiseReq);
    floorRecipes.set(cruise.name, cruise);
    
    const birthdayReq = [["Pendant", 14],
                    ["Water", 14],
                    ["Fire", 7],
                    ["Gold", 4],
                    ["Necklace", 3],
                    ];
    const birthday = new Floor("Birthday", 52, birthdayReq);
    floorRecipes.set(birthday.name, birthday);
    
    const arcadeReq = [["Pendant", 23],
                    ["Sparkles", 8],
                    ["Silver", 6],
                    ["Gold", 11],
                    ["Necklace", 3],
                    ];
    const arcade = new Floor("Arcade", 53, arcadeReq);
    floorRecipes.set(arcade.name, arcade);
    
    const tattooReq = [["Artifact", 1],
                    ["Sparkles", 10],
                    ["Needles", 14],
                    ["Gold", 6],
                    ["Silver", 12],
                    ["Water", 9],
                    ["Necklace", 1],
                    ["Waterstone", 4],
                    ["Firestone", 5],
                    ["Elementstone", 1],
                    ];
    const tattoo = new Floor("Tattoo", 54, tattooReq);
    floorRecipes.set(tattoo.name, tattoo);
    
    const airportReq = [["Water", 11],
                    ["Fire", 6],
                    ["Gold", 6],
                    ["Silver", 7],
                    ["Waterstone", 10],
                    ["Firestone", 5],
                    ["Necklace", 1],
                    ];
    const airport = new Floor("Airport", 55, airportReq);
    floorRecipes.set(airport.name, airport);
    
    const smallPetsReq = [["Water", 10],
                    ["Gold", 2],
                    ["Silver", 6],
                    ["Pendant", 2],
                    ["Necklace", 3],
                    ["Fire", 4],
                    ["Waterstone", 8],
                    ["Firestone", 6],
                    ];
    const smallPets = new Floor("Small Pets", 56, smallPetsReq);
    floorRecipes.set(smallPets.name, smallPets);
    
    const hippieReq = [["Artifact", 1],
                    ["Gold", 2],
                    ["Silver", 6],
                    ["Necklace", 2],
                    ["Water", 9],
                    ["Fire", 5],
                    ["Elementstone", 2],
                    ["Firestone", 6],
                    ];
    const hippie = new Floor("Hippie", 57, hippieReq);
    floorRecipes.set(hippie.name, hippie);
    
    const piratesReq = [["Pendant", 12],
                    ["Gold", 4],
                    ["Waterstone", 6],
                    ["Fire", 5],
                    ["Firestone", 2],
                    ["Elementstone", 2],
                    ["Necklace", 3],
                    ];
    const pirates = new Floor("Pirates", 58, piratesReq);
    floorRecipes.set(pirates.name, pirates);
    
    const hospitalReq = [["Sparkles", 12],
                    ["Needles", 12],
                    ["Gold", 8],
                    ["Silver", 8],
                    ["Water", 6],
                    ["Fire", 5],
                    ["Waterstone", 8],
                    ["Firestone", 6],
                    ["Elementstone", 2],
                    ];
    const hospital = new Floor("Hospital", 59, hospitalReq);
    floorRecipes.set(hospital.name, hospital);
    
    const playgroundReq = [["Necklace", 2],
                    ["Water", 10],
                    ["Fire", 14],
                    ["Waterstone", 10],
                    ["Firestone", 2],
                    ["Elementstone", 2],
                    ];
    const playground = new Floor("Playground", 60, playgroundReq);
    floorRecipes.set(playground.name, playground);
    
    const shipwreckReq = [["Artifact", 2],
                    ["Gold", 2],
                    ["Silver", 6],
                    ["Pendant", 4],
                    ["Necklace", 2],
                    ["Waterstone", 3],
                    ["Firestone", 5],
                    ["Elementstone", 3],
                    ];
    const shipwreck = new Floor("Shipwreck", 61, shipwreckReq);
    floorRecipes.set(shipwreck.name, shipwreck);
    
    /**
     * Floor: 62-64 all require the same material, in the same order.
     *  Increase performance, by just using the same CraftingRequirement list
     */
    const identical62 = [["Necklace", 1],
                        ["Fire", 10],
                        ["Pendant", 6],
                        ["Waterstone", 11],
                        ["Firestone", 8],
                        ["Elementstone", 2],
    ];
    
    const gnomes = new Floor("Gnomes", 62, identical62);
    floorRecipes.set(gnomes.name, gnomes);
    
    const deconstructivism = new Floor("Deconstructivism", 63, identical62);
    floorRecipes.set(deconstructivism.name, deconstructivism);
    
    const caveman = new Floor("Caveman", 64, identical62);
    floorRecipes.set(caveman.name, caveman);
    
    const miniature = new Floor("Miniature", 65, identical62);
    floorRecipes.set(miniature.name, miniature);
    
    const wrestling = new Floor("Wrestling", 66, identical62);
    floorRecipes.set(wrestling.name, wrestling);

    const laundromat = new Floor("Laundromat", 67, identical62);
    floorRecipes.set(laundromat.name, laundromat);

    const infant = new Floor("Infant", 68, identical62);
    floorRecipes.set(infant.name, infant);
    
    const tropicalFruitReq = [["Firestone", 6],
                        ["Pendant", 2],
                        ["Elementstone", 2],
                        ["Gold", 6],
                        ["Orb", 45],
                        ["Necklace", 1],
                        ["Waterstone", 8],
                        ["Artifact", 2],
                        ["Fire", 1],
    ];
    const tropicalFruit = new Floor("Tropical Fruit", 69, tropicalFruitReq);
    floorRecipes.set(tropicalFruit.name, tropicalFruit);

    return floorRecipes;
}