/*
This is empty on purpose! Your code to build the resume will go here.
 */

var bio = {
    "name": "Abhiram Iyer",
    "role": "Software Developer",
    "welcomeMessage": "Welcome to my page",
    "contacts": {
        "mobile": "+91-123456789",
        "email" : "abhiram@email.com",
        "github": "abhiramiyer",
        "twitter": "@AbhiramIyer",
        "location": "Bengaluru"
    },
    "skills" : ["Design", "Coding", "Testing", "C/C++", "Python", "JavaScript"],
    "biopic" : "https://twitter.com/AbhiramIyer/profile_image?size=original",
};

bio.display = function() {
	var formattedName = HTMLheaderName.replace("%data%",bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%",bio.role);
	var formattedImage = HTMLbioPic.replace("%data%",bio.biopic);
	var formattedMessage = HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage);

    $("#header").append(formattedName, formattedRole, formattedImage, formattedMessage);

	if (bio.skills.length > 0) {

        $("#header").append(HTMLskillsStart);
        bio.skills.forEach(function(skill) {
            $("#skills").append(HTMLskills.replace("%data%", skill));
        });
    }

    $("#topContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#topContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    $("#topContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));


    $("#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#footerContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    $("#footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));

}

var education = {
    "schools": [
        {
            "name": "National Institute of Technology Karnataka",
            "location": "Surathkal",
            "degree": "Bachelor of Engineering",
            "majors": "Information Technology",
            "dates": "2000-2004",
            "url": "http://nitk.ac.in"
        }
    ],
    "onlineCourses" : [
        {
            "title" : "Front-End Web Developer Nanodegree",
            "school" : "Udacity",
            "dates" : "2016",
            "url" : "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
	   }
    ],
};

education.display = function () {
    var formattedSchoolName;
    var formattedSchoolDegree;

    if (education.schools.length > 0) {
        education.schools.forEach(function(school){
            $("#education").append(HTMLschoolStart);
            formattedSchoolName = HTMLschoolName.replace("%data%", school.name);
            formattedSchoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
            $(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);
            $(".education-entry:last").append(HTMLschoolDates.replace("%data%", school.dates));
            $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", school.majors));
            $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", school.location));
            $(".education-entry:last").append(HTMLschoolURL.replace("%data%", school.url));
        });

    }

    var formattedOnlineTitle;
    var formattedOnlineSchool;
    if (education.onlineCourses.length > 0) {
        $("#education").append(HTMLonlineClasses);
        education.onlineCourses.forEach(function(onlineCourse){
            $("#education").append(HTMLonlineClassStart);
            formattedOnlineTitle = HTMLonlineTitle.replace("%data%", onlineCourse.title);
            formattedOnlineSchool = HTMLonlineSchool.replace("%data%", onlineCourse.school);
            $(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool);
            $(".education-entry:last").append(HTMLonlineDates.replace("%data%", onlineCourse.dates));
            $(".education-entry:last").append(HTMLonlineURL.replace("%data%", onlineCourse.url));
        });
    }
}


var work = {
    "jobs": [
        {
            "employer": "Acme Corporation",
            "title": "Software Developer",
            "location": "Bengaluru",
            "dates": "2010-2014",
            "description": "Developed ACME compiler and debugger"
        },
        {
            "employer": "Mumbai Corporation",
            "title": "Software Developer",
            "location": "Mumbai",
            "dates": "2008-2010",
            "description": "Developed foo bar function"
        },
        {
            "employer": "Chennai Corporation",
            "title": "Software Developer",
            "location": "Chennai",
            "dates": "2006-2008",
            "description": "Developed foo bar function"
        }
    ],
};

work.display = function () {
    var formattedEmployer;
    var formattedTitle;
    if (work.jobs.length > 0) {
        work.jobs.forEach(function(job){
            $("#workExperience").append(HTMLworkStart);
            formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            $(".work-entry:last").append(formattedEmployer + formattedTitle);
            $(".work-entry:last").append(HTMLworkDates.replace("%data%", job.dates));
            $(".work-entry:last").append(HTMLworkDescription.replace("%data%", job.description));
        });
    }
}

var projects = {
	"projectList" : [
        {
		"title" : "ACME Audio App",
		"dates" : "2010",
		"description" : "ACME Audio App can play a wide variety of screeching sounds. Very useful if you are into that sort of thing.",
		"images" : ["images/project1-300x200.jpg", "images/project2-300x200.jpg"]
	   },
	   {
		"title" : "ACME Sound Blocker",
		"dates" : "2012",
		"description" : "ACME Sound Blocker blocks the screeching sounds made by the ACME Audio App.",
		"images" : ["images/project3-300x200.jpg","images/project2-300x200.jpg"]
	   }
    ]
};

projects.display = function() {
    if (projects.projectList.length > 0) {
        projects.projectList.forEach(function(project){
            $("#projects").append(HTMLprojectStart);
            $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", project.title));
            $(".project-entry:last").append(HTMLprojectDates.replace("%data%", project.dates));
            $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", project.description));

            project.images.forEach(function(image){
                var formattedImage = HTMLprojectImage.replace("%data%",image);
                $(".project-entry:last").append(formattedImage);
            });
        });
    }
}

//$("#main").append(internationalizeButton);
bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv").append(googleMap);