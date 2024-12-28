// Homework2 - Test data

export const ICOclientsData = {
    ico: "22834958",
    client : "Czechitas z.ú.",
    address : "Václavské náměstí 837, 11000 Praha",
}
const testId = Math.floor(Math.random() * 100000000).toString(); //creating an ICO

export const validClientData = {
    ico: testId,
    client : "Baggins school",
    address : "Bag End, Hobbiton, Westfarting",
    representative : "Bilbo Baggins",
    contactName : "Frodo Baggins",
    contactTel : "720989899",
    contactEmail : "bagginsschool@gmail.com"
}
export const validCampOrderData = {
    startDate: ["27.12.2024"],
    endDate : ["05.01.2025"],
    campData : "Odpolední",
    campStudents : "5",
    campAge : "12",
    campAdults : "3"
}
export const invalidClientData = {
    ico: testId,
    client : "Baggins school",
    address : "Bag End, Hobbiton, Westfarting",
    representative : "Bilbo Baggins",
    contactName : "Frodo Baggins",
    contactTel : "12345",
    contactEmail : "bagginsschool@gmail.com"
}
export const invalidCampOrderData = {
    startDate: ["27.12.2024", "05.03.2025"],
    endDate : ["05.01.2025", ""],
    campData : "Dopolední",
    campStudents : "5",
    campAge : "11",
    campAdults : "3"
}
 