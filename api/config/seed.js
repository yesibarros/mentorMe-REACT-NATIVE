const areasArray = [
  "FrontEnd",
  "Node Developer",
  "PHP Developer",
  "Leadership",
  "Automated Testing",
];
const objectiveNames = [
  "Aprender JavaScript",
  "Aprender Node",
  "Hacer el back en un proyecto",
  "Aprender HTML",
  "Aprender PHP",
  "Hacer curso de SCRUM",
  "Aprender Jasmine",
  "Trabajar en 10 proyectos",
  "Aprender Redux",
];
const desriptionsArray = [
  "Soy Full Stack Developer",
  "Node Developer",
  "Front End Developer",
  "I Love CODE",
  "I Love JavaScript",
];
const maxAmountOfTechnologiesPerUser = 15;
const maxAmountOfAreasPerUser = 5;
const maxAmountOfObjectivesPerUser = 6;
const adminRandomUsers = 2;
const menteeUsers = 40;
const mentorUsers = 15;
const menteeAndMentorUsers = 6;
const maxMenteesPerMentor = 5;

//*************************--SEED--******************************//
const faker = require("faker");
const Promise = require("bluebird");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

//DB CONNECTION
const { connection } = require("./index.js");

//MODELS
const {
  Technology,
  User,
  Location,
  Area,
  Objective,
  Country,
} = require("../models/index");

//DATA
const technologiesArray = require("./dataToSeed/technologies");
const countriesArray = require("./dataToSeed/countries");
const locationsArray = require("./dataToSeed/locations");

//LOREM CONFIG
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const setup = async () => {
  console.log("Starting the seeding process 🌱");

  //CREATE COUNTRIES
  console.log("🌎 Country seeds...");
  const countries = await Country.create(countriesArray);
  console.log("    ✓ Countires seeded successfully!");

  //CREATE LOCATIONS
  console.log("🏙  Location seeds...");
  const locationsToSeed = locationsArray.forEach(
    (l) => (l.country = countries.filter((c) => c.countryName == l.country)[0])
  );
  const locations = await Location.create(locationsArray);
  console.log("    ✓ Locations seeded successfully!");

  //CREATE TECHNOLOGIES
  console.log("🔧 Technology seeds..."); //Deberiamos guardar dos nombres en la DB? El nombre con mayúsculas, guiones, espacios, etc, y uno "normalizado"
  const technologies = await Technology.create(technologiesArray);
  console.log("    ✓ Technologies seeded successfully!");

  //CREATE AREAS
  console.log("🗂  Area seeds...");
  const startAreasObjs = areasArray.map((a) => ({ areaName: a })); //areas get 8 of weight per default in the model
  const areas = await Area.create(startAreasObjs);
  console.log("    ✓ Areas seeded successfully!");

  //CREATE USERS
  const getRandom = (list, max) => {
    const a = [];
    const maxQty = Math.ceil(Math.random() * (max - 1));
    for (let j = 0; j < maxQty; j++) {
      const toPush = list[Math.floor(Math.random() * list.length)];
      if (!a.includes(toPush)) a.push(toPush);
    }
    return a;
  };

  const startUsersObjs = []; //Array of users to be saved

  //PUSH HARCODED ADMIN USER
  startUsersObjs.push({
    firstName: "Fabri",
    lastName: "Guada",
    password: "admin",
    email: "admin@admin.com",
    workingSince: 2010,
    img: faker.image.image(),
    role: ["admin"],
    location: locations[Math.floor(Math.random() * locations.length)],
  });

  //PUSH ADMIN RANDOM USERS
  for (let i = 0; i < adminRandomUsers; i++) {
    startUsersObjs.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      workingSince: 2010,
      img: faker.image.image(),
      role: ["admin"],
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }

  //PUSH MENTEE USERS
  for (let i = 0; i < menteeUsers; i++) {
    startUsersObjs.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "test",
      email: faker.internet.email(),
      role: ["mentee"],
      workingSince: new Date().getFullYear() - Math.floor(Math.random() * 3),
      img: faker.image.image(),
      areas: getRandom(areas, maxAmountOfAreasPerUser),
      technologies: getRandom(technologies, maxAmountOfTechnologiesPerUser),
      location: locations[Math.floor(Math.random() * locations.length)],
      wantsEmails: [true, false][Math.floor(Math.random() * 2)],
      description: getRandom(desriptionsArray, 1).toString(),
    });
  }

  //PUSH MENTOR USERS
  for (let i = 0; i < mentorUsers; i++) {
    startUsersObjs.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "test",
      email: faker.internet.email(),
      workingSince:
        new Date().getFullYear() - 1 - Math.floor(Math.random() * 10),
      role: ["mentor"],
      img: faker.image.image(),
      areas: getRandom(areas, maxAmountOfAreasPerUser),
      technologies: getRandom(technologies, maxAmountOfTechnologiesPerUser),
      location: locations[Math.floor(Math.random() * locations.length)],
      wantsEmails: [true, false][Math.floor(Math.random() * 2)],
      description: getRandom(desriptionsArray, 1).toString(),
    });
  }

  //PUSH MENTEE-MENTOR USERS
  for (let i = 0; i < menteeAndMentorUsers; i++) {
    startUsersObjs.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "test",
      email: faker.internet.email(),
      role: ["mentee", "mentor"],
      workingSince:
        new Date().getFullYear() - 1 - Math.floor(Math.random() * 10),
      areas: getRandom(areas, maxAmountOfAreasPerUser),
      img: faker.image.image(),
      technologies: getRandom(technologies, maxAmountOfTechnologiesPerUser),
      location: locations[Math.floor(Math.random() * locations.length)],
      wantsEmails: [true, false][Math.floor(Math.random() * 2)],
      description: getRandom(desriptionsArray, 1).toString(),
    });
  }

  console.log("👥 User seeds...");
  const users = await User.create(startUsersObjs); //Save array of users in database by creating the users
  console.log("    ✓ Users stage 1 seeded successfully!");

  //ADD MENTORS TO MENTEES (1 mentor per mentee)
  const mentees = users.filter((user) => user.role.includes("mentee"));
  const mentors = users.filter((user) => user.role.includes("mentor"));

  const updateUsers = []; //Array of updates to make
  mentees.forEach((mentee) => {
    const mentor = mentors[Math.floor(Math.random() * mentors.length)];

    if (mentor.mentees.length < maxMenteesPerMentor) {
      mentor.mentees.push(mentee);
      updateUsers.push([mentee._id._id, { mentor }]);
      updateUsers.push([mentor._id._id, { mentees: mentor.mentees }]);
    }
  });
  //Save all updates to the database
  const updatedUsers = await Promise.each(updateUsers, (user) => {
    return User.findOneAndUpdate({ _id: user[0] }, { ...user[1] });
  });
  console.log("    ✓ Users stage 2 seeded successfully!");
  console.log(" ");
  console.log("Finished seeding 🌳 You are all set!.");
  console.log(" ");
};
module.exports = setup;

try {
  connection.once("open", () => setup().then(() => process.exit(0)));
} catch (err) {
  console.log("❌ Somethin went wrong on the seed process", err.message);
  process.exit(1);
}
