/**
 * @module Gruntfile
 * @param grunt
 * @author Joshua McFarland
 */
module.exports = function(grunt) {

    var paths = {
        //directories
        spec: '../../test/spec',
        template: '../../template',
        //libraries
        async: '../lib/async-0.9.0',
        backbone: '../lib/backbone-1.1.2.min',
        bootstrap: '../../bootstrap/js/bootstrap.min',
        'bootstrap.notify': '../../bootstrap/components/notify/bootstrap-notify.min',
        'bootstrap.switch': '../../bootstrap/components/switch/js/bootstrap-switch.min',
        'createjs.easel': '../lib/createjs.easel-NEXT.min',
        'createjs.tween': '../lib/createjs.tween-NEXT.min',
        moment: '../lib/moment-2.7.0.min',
        'moment-timezone': '../lib/moment.timezone-0.1.0.min',
        jasmine: '../../test/lib/jasmine',
        'jasmine-html': '../../test/lib/jasmine-html',
        'jasmine-boot': '../../test/lib/boot',
        jquery: '../lib/jquery-1.11.1.min',
        'jquery.mobile': '../lib/jquery.mobile.custom.min',
        'jquery.ui': '../lib/jquery.ui.custom-1.10.4.min',
        raygun: '../lib/raygun-1.8.4.min',
        'require.locale': '../lib/require.i18n-2.0.4',
        'require.text': '../lib/require.text-2.0.12',
        underscore: '../lib/lodash.compat-2.4.1.min'
    };

    var shim = {
        bootstrap: ['jquery'],
        'bootstrap.notify': ['bootstrap'],
        'bootstrap.switch': ['bootstrap'],
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        },
        'jquery.mobile': ['jquery'],
        'jquery.ui': ['jquery'],
        'moment-timezone': ['moment']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*** CLEAN ***/
        clean: {
            'cordova-chinese': {
                src: [
                    'build/cordova/chinese/platforms/android/res/drawable-land-hdpi',
                    'build/cordova/chinese/platforms/android/res/drawable-land-ldpi',
                    'build/cordova/chinese/platforms/android/res/drawable-land-mdpi',
                    'build/cordova/chinese/platforms/android/res/drawable-land-xhdpi',
                    'build/cordova/chinese/platforms/android/res/drawable-port-hdpi',
                    'build/cordova/chinese/platforms/android/res/drawable-port-ldpi',
                    'build/cordova/chinese/platforms/android/res/drawable-port-mdpi',
                    'build/cordova/chinese/platforms/android/res/drawable-port-xhdpi',
                    'build/cordova/chinese/www/**/*'
                ],
                options: {
                    force: true
                }
            },
            'cordova-chinese-cordovalib': {
                src: ['build/cordova/chinese/platforms/android/CordovaLib'],
                options: {
                    force: true
                }
            },
            'cordova-japanese': {
                src: [
                    'build/cordova/japanese/platforms/android/res/drawable-land-hdpi',
                    'build/cordova/japanese/platforms/android/res/drawable-land-ldpi',
                    'build/cordova/japanese/platforms/android/res/drawable-land-mdpi',
                    'build/cordova/japanese/platforms/android/res/drawable-land-xhdpi',
                    'build/cordova/japanese/platforms/android/res/drawable-port-hdpi',
                    'build/cordova/japanese/platforms/android/res/drawable-port-ldpi',
                    'build/cordova/japanese/platforms/android/res/drawable-port-mdpi',
                    'build/cordova/japanese/platforms/android/res/drawable-port-xhdpi',
                    'build/cordova/japanese/www/**/*'
                ],
                options: {
                    force: true
                }
            },
            'cordova-japanese-cordovalib': {
                src: ['build/cordova/japanese/platforms/android/CordovaLib'],
                options: {
                    force: true
                }
            },
            'build': {
                src: ['build'],
                options: {
                    force: true
                }
            },
            'utils-chinese': {
                src: [
                    'utils/apksigner/unsigned/SkritterChinese-release-unsigned.apk',
                    'utils/apksigner/signed/Skritter-chinese.apk',
                    'utils/apktool/SkritterChinese-release-unsigned/assets/www/**/*'
                ],
                options: {
                    force: true
                }
            },
            'utils-japanese': {
                src: [
                    'utils/apksigner/unsigned/SkritterJapanese-release-unsigned.apk',
                    'utils/apksigner/signed/Skritter-japanese.apk',
                    'utils/apktool/SkritterJapanese-release-unsigned/assets/www/**/*'
                ],
                options: {
                    force: true
                }
            },
            'web': {
                src: ['build/web'],
                options: {
                    force: true
                }
            }
        },

        /*** COPY ***/
        copy: {
            'apktool-apksigner-chinese': {
                files: [
                    {
                        expand: true,
                        cwd: 'utils/apktool/SkritterChinese-release-unsigned/dist',
                        src: '**/*',
                        dest: 'utils/apksigner/unsigned'
                    }
                ]
            },
            'apktool-apksigner-japanese': {
                files: [
                    {
                        expand: true,
                        cwd: 'utils/apktool/SkritterJapanese-release-unsigned/dist',
                        src: '**/*',
                        dest: 'utils/apksigner/unsigned'
                    }
                ]
            },
            'cordova-chinese': {
                files: [
                    {
                        expand: true,
                        cwd: 'public_html',
                        src: [
                            '**',
                            '!font/japanese/**'
                        ],
                        dest: 'build/cordova/chinese/www'
                    }
                ]
            },
            'cordova-chinese-cordovalib': {
                files: [
                    {
                        expand: true,
                        cwd: 'config/crosswalk/framework',
                        src: ['**/*'],
                        dest: 'build/cordova/chinese/platforms/android/CordovaLib'
                    },
                    {
                        expand: true,
                        cwd: 'config/crosswalk',
                        src: ['VERSION'],
                        dest: 'build/cordova/chinese/platforms/android'
                    }
                ]
            },
            'cordova-japanese': {
                files: [
                    {
                        expand: true,
                        cwd: 'public_html',
                        src: [
                            '**/*',
                            '!font/chinese/**'
                        ],
                        dest: 'build/cordova/japanese/www'
                    }
                ]
            },
            'cordova-japanese-cordovalib': {
                files: [
                    {
                        expand: true,
                        cwd: 'config/crosswalk/framework',
                        src: ['**/*'],
                        dest: 'build/cordova/japanese/platforms/android/CordovaLib'
                    },
                    {
                        expand: true,
                        cwd: 'config/crosswalk',
                        src: ['VERSION'],
                        dest: 'build/cordova/japanese/platforms/android'
                    }
                ]
            },
            'cordova-config-chinese': {
                files: [
                    {
                        expand: true,
                        cwd: 'config/chinese',
                        src: '**/*',
                        dest: 'build/cordova/chinese'
                    }
                ]
            },
            'cordova-config-japanese': {
                files: [
                    {
                        expand: true,
                        cwd: 'config/japanese',
                        src: '**/*',
                        dest: 'build/cordova/japanese'
                    }
                ]
            },
            'cordova-apksigner-chinese': {
                files: [
                    {
                        expand: true,
                        cwd: 'build/cordova/chinese/platforms/android/ant-build/',
                        src: 'Skritter-release-unsigned.apk',
                        dest: 'utils/apksigner/unsigned/',
                        rename: function(dest, src) { return dest + src.replace('Skritter', 'SkritterChinese'); }
                    }
                ]
            },
            'cordova-apksigner-japanese': {
                files: [
                    {
                        expand: true,
                        cwd: 'build/cordova/japanese/platforms/android/ant-build/',
                        src: 'Skritter-release-unsigned.apk',
                        dest: 'utils/apksigner/unsigned/',
                        rename: function(dest, src) { return dest + src.replace('Skritter', 'SkritterJapanese'); }
                    }
                ]
            },
            'cordova-apktool-chinese': {
                files: [
                    {
                        expand: true,
                        cwd: 'build/cordova/chinese/platforms/android/assets/www',
                        src: '**/*',
                        dest: 'utils/apktool/SkritterChinese-release-unsigned/assets/www'
                    }
                ]
            },
            'cordova-apktool-japanese': {
                files: [
                    {
                        expand: true,
                        cwd: 'build/cordova/japanese/platforms/android/assets/www',
                        src: '**/*',
                        dest: 'utils/apktool/SkritterJapanese-release-unsigned/assets/www'
                    }
                ]
            }
        },

        /*** CSSLINT ***/
        csslint: {
            'root': {
                options: {
                    csslintrc: 'csslintrc.json',
                    import: 2
                },
                src: ['public_html/css/**/*.css']
            }
        },

        /*** JSHINT ***/
        jshint: {
            'root': ['Gruntfile.js', 'public_html/js/app/**/*.js']
        },

        /*** MANIFEST ***/
        manifest: {
            root: {
                options: {
                    basePath: 'public_html/',
                    cache: ['index.html'],
                    network: ['*'],
                    preferOnline: false,
                    verbose: false,
                    timestamp: true,
                    exclude: ['skritter.appcache', 'version.json']
                },
                src: [
                    '*.*',
                    '**/*.css',
                    '**/*.eot',
                    '**/*.html',
                    '**/*.js',
                    '**/*.otf',
                    '**/*.png',
                    '**/*.svg',
                    '**/*.woff'
                ],
                dest: 'public_html/skritter.appcache'
            }
        },

        /*** REPLACE ***/
        replace: {
            'cordova-chinese': {
                options: {
                    variables: {
                        'androidPublicKey': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwfbJgVyApOKSfeNtWqQPdikWCWYzNfh4ujKVxv5QZRTFxAKlfZnhT563Ttv1tUSS5OOBHiC+FJfTWKowcWTwRpT0+3WAD+5GiFpCE2khivssSrKxvL3A3dU+MhNp+CndVzMX/jIYTq5WPakV74oEATJT1MUCrWNklQTirt8H2cwtMZ7A7Nlhw8dn3gLyThEMyFSQN/J8au9H9NvPyQA8g9HjVJbC6EBQxotfnwWxTkmcD4nFStS5oelKCWrvmyzceYrsDTYGAL8wXNd+5RZ62B7w1jVnUS6JMBVCnpfTN/BeH80KcLmr3gBVDEbyjKoH6Ov47FgwLJWQc/+fKjNJvwIDAQAB',
                        'date': new Date().toUTCString().substr(0, 25),
                        'languageCode': 'zh',
                        'trackingID': 'UA-52116701-1',
                        'version': '<%= pkg.version %>',
                        'versionCode': '<%= pkg.versionCode %>'
                    }
                },
                files: [
                    {src: 'config.xml', dest: 'build/cordova/chinese', expand: true, cwd: 'build/cordova/chinese'},
                    {src: 'config.xml', dest: 'build/cordova/chinese/www', expand: true, cwd: 'build/cordova/chinese/www'},
                    {src: 'main.js', dest: 'build/cordova/chinese/www/js', expand: true, cwd: 'build/cordova/chinese/www/js'},
                    {src: 'InAppBillingPlugin.java', dest: 'build/cordova/chinese/plugins/com.jernung.cordova.inappbilling/src/android/inappbilling',
                        expand: true, cwd: 'build/cordova/chinese/plugins/com.jernung.cordova.inappbilling/src/android/inappbilling'}
                ]
            },
            'cordova-japanese': {
                options: {
                    variables: {
                        'androidPublicKey': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqO6YEuVqO+E7OmrSU7HEp1mi4hAoIKcMB/WyS7XGbPEZ9t/E+XjIv7MqlhVe9ROsoT7YS3kSlp19XX6uaiibgwbi6TDifyFMVjtOLqSEVcd9XrL6kk22JB8Z/6g8L/lEsLGWdBWyeEpWLpJ+pgewDnA3JsulmGvzo6qoAF5nRUitlYBcFDpFs1asfYh0cLiLO77D+TtIrz3T9bgdO/Hcz7pykiPYW5yuoe6RGKpoI3RNvbfO5aItAcXa3dKeReHx9YgfyASSYZvcmKLXyNAlHgadU0jQ1KoA/fJV429Qx8ACBmecJolT/ydMXbu1X9PWlh02bdvYiMfVPK2GZ/1xawIDAQAB',
                        'date': new Date().toUTCString().substr(0, 25),
                        'languageCode': 'ja',
                        'trackingID': 'UA-52116701-2',
                        'version': '<%= pkg.version %>',
                        'versionCode': '<%= pkg.versionCode %>'
                    }
                },
                files: [
                    {src: 'config.xml', dest: 'build/cordova/japanese', expand: true, cwd: 'build/cordova/japanese'},
                    {src: 'config.xml', dest: 'build/cordova/japanese/www', expand: true, cwd: 'build/cordova/japanese/www'},
                    {src: 'main.js', dest: 'build/cordova/japanese/www/js', expand: true, cwd: 'build/cordova/japanese/www/js'},
                    {src: 'InAppBillingPlugin.java', dest: 'build/cordova/japanese/plugins/com.jernung.cordova.inappbilling/src/android/inappbilling',
                        expand: true, cwd: 'build/cordova/japanese/plugins/com.jernung.cordova.inappbilling/src/android/inappbilling'}
                ]
            },
            'web': {
                options: {
                    variables: {
                        'date': new Date().toUTCString().substr(0, 25),
                        'version': '<%= pkg.version %>',
                    }
                },
                files: [
                    {src: 'Application.js', dest: 'build/web/js/app', expand: true, cwd: 'build/web/js/app'}
                ]
            }
        },

        /*** REQUIREJS ***/
        requirejs: {
            'web': {
                options: {
                    appDir: 'public_html/',
                    baseUrl: 'js/app',
                    dir: 'build/web',
                    generateSourceMaps: true,
                    keepBuildDir: false,
                    modules: [
                        {
                            name: 'Application'
                        },
                        {
                            name: 'Libraries'
                        }
                    ],
                    optimize: 'uglify2',
                    optimizeCss: 'standard',
                    paths: paths,
                    preserveLicenseComments: false,
                    removeCombined: true,
                    shim: shim
                }
            }
        },

        /*** SHELL ***/
        shell: {
            'apktool-compile-chinese': {
                command: [
                    'cd utils/apktool',
                    'apktool b SkritterChinese-release-unsigned',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'apktool-compile-japanese': {
                command: [
                    'cd utils/apktool',
                    'apktool b SkritterJapanese-release-unsigned',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'apksigner-build-chinese': {
                command: [
                    'cd utils/apksigner',
                    'sign-skritter_chinese'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'apksigner-build-japanese': {
                command: [
                    'cd utils/apksigner',
                    'sign-skritter_japanese',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-build-android-chinese': {
                command: [
                    'cd build/cordova/chinese',
                    'cordova build android',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-build-android-chinese-release': {
                command: [
                    'cd build/cordova/chinese',
                    'cordova build android --release',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-build-android-japanese': {
                command: [
                    'cd build/cordova/japanese',
                    'cordova build android',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-build-android-japanese-release': {
                command: [
                    'cd build/cordova/japanese',
                    'cordova build android --release',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-install-chinese': {
                command: [
                    'cd build/cordova',
                    'cordova create chinese com.inkren.skritter.chinese Skritter',
                    'cd chinese',
                    'cordova platforms add android',
                    'cordova plugin add org.apache.cordova.splashscreen',
                    'cordova plugin add https://github.com/mcfarljw/cordova-plugin-analytics.git',
                    'cordova plugin add https://github.com/mcfarljw/cordova-plugin-inappbilling.git',
                    'cordova plugin add https://github.com/mcfarljw/cordova-plugin-expansion.git'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-install-chinese-crosswalk': {
                command: [
                    'cd build/cordova/chinese/platforms/android/CordovaLib',
                    'android update project --subprojects --path . --target android-19',
                    'ant debug'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-install-japanese': {
                command: [
                    'cd build/cordova',
                    'cordova create japanese com.inkren.skritter.japanese Skritter',
                    'cd japanese',
                    'cordova platforms add android',
                    'cordova plugin add org.apache.cordova.splashscreen',
                    'cordova plugin add https://github.com/mcfarljw/cordova-plugin-analytics.git',
                    'cordova plugin add https://github.com/mcfarljw/cordova-plugin-inappbilling.git',
                    'cordova plugin add https://github.com/mcfarljw/cordova-plugin-expansion.git'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-install-japanese-crosswalk': {
                command: [
                    'cd build/cordova/japanese/platforms/android/CordovaLib',
                    'android update project --subprojects --path . --target android-19',
                    'ant debug'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-prepare': {
                command: [
                    'mkdir build',
                    'cd build',
                    'mkdir cordova'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-run-android-chinese': {
                command: [
                    'cd build/cordova/chinese',
                    'cordova run android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'cordova-run-android-japanese': {
                command: [
                    'cd build/cordova/japanese',
                    'cordova run android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'kill-adb': {
                command: 'taskkill /F /IM adb.exe',
                options: {
                    failOnError: false,
                    stderr: true,
                    stdout: true
                }
            }
        }
    });

    /*** PACKAGES ***/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-shell');

    /*** COMMANDS ***/
    grunt.registerTask('build-android', [
        'build-android-chinese',
        'build-android-japanese'
    ]);

    grunt.registerTask('build-android-chinese', [
        'validate',
        'clean:cordova-chinese',
        'copy:cordova-chinese',
        'copy:cordova-config-chinese',
        'replace:cordova-chinese',
        'shell:cordova-build-android-chinese'
    ]);

    grunt.registerTask('build-android-chinese-release', [
        'validate',
        'clean:cordova-chinese',
        'copy:cordova-chinese',
        'copy:cordova-config-chinese',
        'replace:cordova-chinese',
        'shell:cordova-build-android-chinese-release'
    ]);

    grunt.registerTask('build-android-japanese', [
        'validate',
        'clean:cordova-japanese',
        'copy:cordova-japanese',
        'copy:cordova-config-japanese',
        'replace:cordova-japanese',
        'shell:cordova-build-android-japanese'
    ]);

    grunt.registerTask('build-android-japanese-release', [
        'validate',
        'clean:cordova-japanese',
        'copy:cordova-japanese',
        'copy:cordova-config-japanese',
        'replace:cordova-japanese',
        'shell:cordova-build-android-japanese-release'
    ]);

    grunt.registerTask('build-run-android', [
        'build-run-android-chinese',
        'build-run-android-japanese'
    ]);

    grunt.registerTask('build-run-android-chinese', [
        'build-android-chinese',
        'run-android-chinese'
    ]);

    grunt.registerTask('build-run-android-japanese', [
        'build-android-japanese',
        'run-android-japanese'
    ]);

    grunt.registerTask('build-web', [
        'validate',
        'clean:web',
        'requirejs:web',
        'replace:web'
    ]);

    grunt.registerTask('install', [
        'shell:kill-adb',
        'clean:build',
        'shell:cordova-prepare',
        'shell:cordova-install-chinese',
        'clean:cordova-chinese-cordovalib',
        'copy:cordova-chinese-cordovalib',
        'shell:cordova-install-chinese-crosswalk',
        'shell:cordova-install-japanese',
        'clean:cordova-japanese-cordovalib',
        'copy:cordova-japanese-cordovalib',
        'shell:cordova-install-japanese-crosswalk'
    ]);

    grunt.registerTask('install-build', [
        'install',
        'build-android'
    ]);

    grunt.registerTask('package-android', [
        'package-android-chinese',
        'package-android-japanese'
    ]);

    grunt.registerTask('package-android-chinese', [
        'build-android-chinese-release',
        'clean:utils-chinese',
        'copy:cordova-apksigner-chinese',
        'shell:apksigner-build-chinese'
    ]);

    grunt.registerTask('package-android-japanese', [
        'build-android-japanese-release',
        'clean:utils-japanese',
        'copy:cordova-apksigner-japanese',
        'shell:apksigner-build-japanese'
    ]);

    grunt.registerTask('run-android-chinese', [
        'shell:cordova-run-android-chinese'
    ]);

    grunt.registerTask('run-android-japanese', [
        'shell:cordova-run-android-japanese'
    ]);

    grunt.registerTask('validate', [
        'csslint:root',
        'jshint:root'
    ]);
};