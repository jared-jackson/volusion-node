angular.module('VolutionApp', [])
    .controller('VolutionController', ['$scope', '$http', '$log',
        function ($scope, $http, $log) {
            var api_root = 'https://cqze8l1aq1.execute-api.us-east-1.amazonaws.com/latest';
            $scope.consultWatson = function () {
                var consult_url = $scope.consult_url;
                $http({
                    method: 'GET',
                    url: api_root + '?url=' + consult_url
                }).then(function successCallback(response) {
                    var emotion_values = $.map(response.data, function (value) {
                        return [value];
                    });
                    if (emotion_values) {
                        for (var x in emotion_values) {
                            $scope.circles[x].animate(emotion_values[x]);
                        }
                    }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            };
            $scope.circles = assembleRadials();
            for (var x = 0; x < $scope.circles.length; x++) {
                $scope.circles[x].animate(0.0);
            }
        }
    ]);

function assembleRadials() {
    var bar;
    var test = [];
    for (var x = 0; x <= 4; x++) {
        var container = '#container' + x;
        bar = new ProgressBar.Circle(container, {
            color: '#8759f2',
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 2400,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#ffc300', width: 2},
            to: {color: '#1fd2ca', width: 4},
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('0%');
                } else {
                    circle.setText(value + "%");
                }

            }
        });
        test.push(bar);
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';
    }
    return test;
}