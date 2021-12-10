import findUserInTeam from "./findUserInTeam";

describe("findUserInTeam helper", function () {
    const team = [
        {
            "_id": "1",
            "username": "Joe123",
            "firstName": "Joe",
            "lastName": "Guyersonman",
            "role": "admin",
            "profileImage": "defaultProfile.jpg",
            "allTimePoints": 700,
            "currentPoints": 50
        },
        {
            "_id": "2",
            "currentPoints": 0,
            "allTimePoints": 0,
            "username": "John123",
            "firstName": "Johny",
            "lastName": "Johnson",
            "role": "user",
            "profileImage": "defaultProfile.jpg"
        },
        {
            "_id": "3",
            "username": "Tom123",
            "firstName": "Tom",
            "lastName": "idk",
            "currentPoints": 0,
            "allTimePoints": 0,
            "role": "user",
            "profileImage": "defaultProfile.jpg"
        },
        {
            "_id": "4",
            "username": "Bob123",
            "firstName": "Tom",
            "lastName": "Balu",
            "currentPoints": 0,
            "allTimePoints": 0,
            "role": "user",
            "profileImage": "defaultProfile.jpg"
        }
    ];

    const nullTeam = null;
    const notArrayTeam = { team: "team"};

    test("findUserInTeam", function () {
        expect(findUserInTeam("1", team)).toEqual(        {
            "_id": "1",
            "username": "Joe123",
            "firstName": "Joe",
            "lastName": "Guyersonman",
            "role": "admin",
            "profileImage": "defaultProfile.jpg",
            "allTimePoints": 700,
            "currentPoints": 50
        });


        expect(findUserInTeam("2", team)).toEqual(        {
            "_id": "2",
            "currentPoints": 0,
            "allTimePoints": 0,
            "username": "John123",
            "firstName": "Johny",
            "lastName": "Johnson",
            "role": "user",
            "profileImage": "defaultProfile.jpg"
        });

        expect(findUserInTeam("3", team)).toEqual(        {
            "_id": "3",
            "username": "Tom123",
            "firstName": "Tom",
            "lastName": "idk",
            "currentPoints": 0,
            "allTimePoints": 0,
            "role": "user",
            "profileImage": "defaultProfile.jpg"
        });

        expect(findUserInTeam("4", team)).toEqual(        {
            "_id": "4",
            "username": "Bob123",
            "firstName": "Tom",
            "lastName": "Balu",
            "currentPoints": 0,
            "allTimePoints": 0,
            "role": "user",
            "profileImage": "defaultProfile.jpg"
        });

        expect(findUserInTeam("12345", team)).toEqual("User ID not Found in current team! (fn:findUserInTeam)");
    })

    test("findUserInTeam errors", function () {
        expect(() => { findUserInTeam("1", nullTeam); }).toThrow(Error);
        expect(() => { findUserInTeam("1", nullTeam); }).toThrow("Cannot Iterate Team of null");
        expect(() => { findUserInTeam("1", notArrayTeam); }).toThrow(Error);
        expect(() => { findUserInTeam("1", notArrayTeam); }).toThrow("Team is not an array");
    })
});


