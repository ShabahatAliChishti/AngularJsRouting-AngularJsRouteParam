var app = angular
    //all routing features are present in ngRoute
    .module("Demo", ["ngRoute"])
    //config function to specifiy configuration
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController"
            })
            //pass parameter using :
            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController"
            })
            .otherwise
            ({

                redirectTo:"/home"
            
        })
    
        //htmlmode5 routing enable here
        $locationProvider.html5Mode(true);
        
    })
    .controller("homeController", function ($scope) {
        $scope.message = "Home Page";
    })
    .controller("coursesController", function ($scope) {
        $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server", "AngularJS", "JavaScript"];
    })
    .controller("studentsController", function ($scope, $http) {
        $http.get("StudentService.asmx/GetAllStudents")
            .then(function (response) {
                $scope.students = response.data;
            })
    })
    .controller("studentDetailsController", function ($scope, $http, $routeParams) {
        $http({
            url: "StudentService.asmx/GetStudent",
            method: "get",
            //to retreive parameter value we use $routeParams object
            params: { id: $routeParams.id }
        }).then(function (response) {
            $scope.student = response.data;
        })

    })