import { Floor } from '../classes/floor';

export function getFloorRecipes(){
    var floorRecipes = new Map();

    const prizeAllReq = [["Item A", 5],
                        ["Item B", 8],
                        ["Item C", 7],
                        ["Item D", 32],
                        ["Item E", 21],
                        ["Item F", 11],
                    ];
    const prizeAll = new Floor("All decorations/cats", 0, prizeAllReq);
    floorRecipes.set(prizeAll.name, prizeAll);
                    
    const prize1Req = [["Item C", 3],
                        ["Item D", 2],
                    ];
    const prize1 = new Floor("Cat 1", 1, prize1Req);
    floorRecipes.set(prize1.name, prize1);
    
    const prize2Req = [ ["Item D", 1] ]
    const prize2 = new Floor("Decoration 1", 2, prize2Req);
    floorRecipes.set(prize2.name, prize2);
    
    const prize3Req = [["Item A", 5],
                        ["Item D", 3],
                        ["Item E", 2],
                    ];
    const prize3 = new Floor("Cat 2", 3, prize3Req);
    floorRecipes.set(prize3.name, prize3);
    
    const prize4Req = [["Item B", 2],
                        ["Item D", 2],
                        ["Item E", 1],
                    ];
    const prize4 = new Floor("Decoration 2", 4, prize4Req);
    floorRecipes.set(prize4.name, prize4);
    
    const prize5Req = [["Item B", 6],
                        ["Item D", 6],
                        ["Item E", 4],
                    ];
    const prize5 = new Floor("Cat 3", 5, prize5Req);
    floorRecipes.set(prize5.name, prize5);
    
    const prize6Req = [["Item C", 4],
                        ["Item D", 4],
                        ["Item E", 3],
                    ];
    const prize6 = new Floor("Decoration 3", 6, prize6Req);
    floorRecipes.set(prize6.name, prize6);
    
    const prize7Req = [["Item D", 4],
                        ["Item E", 3],
                        ["Item F", 2],
                    ];
    const prize7 = new Floor("Cat 4", 7, prize7Req);
    floorRecipes.set(prize7.name, prize7);
    
    const prize8Req = [["Item D", 1],
                        ["Item E", 2],
                        ["Item F", 2],
                    ];
    const prize8 = new Floor("Decoration 4", 8, prize8Req);
    floorRecipes.set(prize8.name, prize8);
    
    const prize9Req = [["Item D", 4],
                        ["Item E", 3],
                        ["Item F", 3],
                    ];
    const prize9 = new Floor("Decoration 5", 9, prize9Req);
    floorRecipes.set(prize9.name, prize9);
    
    const prize10Req = [["Item D", 5],
                        ["Item E", 3],
                        ["Item F", 4],
                    ];
    const prize10 = new Floor("Decoration 6", 10, prize10Req);
    floorRecipes.set(prize10.name, prize10);

    return floorRecipes;
}