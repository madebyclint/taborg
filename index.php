<?php
// Test comment
namespace Taborg;

if ($_SERVER['QUERY_STRING'] === '') {
    header('Location: /?text=Default+text&separator=left-arrow');
    exit;
}

class Definitions
{
    public static $characters = array(
        'check' => '&#10003;',
        'x' => '&#10008;',
        'ellipsis' => '&#8230;',
        'right-arrow' => '&#8594;',
        'left-arrow' => '&#8592;',
        'exclamation' => '&#33;',
        'question' => '&#63;',
        'asterisk' => '&#8727;',
    );
    public static $colors = array(
        'gray' => array(
            'hex'=>'bebebe',
            'rgb'=>'190, 190, 190',
            'invert'=>false,
            ),
        'yellow' => array(
            'hex'=>'ffff00',
            'rgb'=>'255, 255, 0',
            'invert'=>false,
            ),
        'red' => array(
            'hex'=>'ff0000',
            'rgb'=>'255, 0, 0',
            'invert'=>true,
            ),
        'black' => array(
            'hex'=>'000000',
            'rgb'=>'0, 0, 0',
            'invert'=>true,
            ),
        'white' => array(
            'hex'=>'ffffff',
            'rgb'=>'255, 255, 255',
            'invert'=>false,
            )
    );
    public static function getCharacter($par)
    {
        return self::$characters[$par];
    }
    public static function getCharacterKey($par)
    {
        return $key(self::$characters[$par]);
    }
    public static function getColorHex($par)
    {
        return self::$colors[$par]['hex'];
    }
    public static function getColorRgb($par)
    {
        return self::$colors[$par]['rgb'];
    }
    public static function isColorInvert($par)
    {
        return self::$colors[$par]['invert'] ? 'invert' : '';
    }
}

class QueryParameters
{
    public $vars;
    public function getQueryValues()
    {
        return $this->vars;
    }
    public function __construct($par)
    {
        $this->vars = $par;
    }
}

$query = new QueryParameters($_GET);
$vals = $query->getQueryValues();
$separatorKey = isset($vals['separator']) && $vals['separator'] !== '' ? $vals['separator'] : '';
$separator = isset($separatorKey) && $separatorKey !== '' ? Definitions::getCharacter($vals['separator']) : '';
$text = isset($vals['text']) && $vals['text'] !== '' ? filter_var($vals['text'], FILTER_SANITIZE_STRING) : '';
$color = isset($vals['color']) && $vals['color'] !== '' ? $vals['color'] : '';
$colorHex = $color !== '' ? Definitions::getColorHex($color) : '';
$colorRgb = $color !== '' ? Definitions::getColorRgb($color) : '';
$includeInTitle = isset($vals['include-in-title']) && $vals['include-in-title'] === 'on' ? 'on' : 'off';

?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo ($includeInTitle === 'on' ? $separator . ' ' : ' ') . $text; ?></title>

    <link rel="shortcut icon" href="/images/<?php echo $separatorKey . ($color !== '' ? '-' . $color : ''); ?>.png" />

    <style>
        body {
            text-align: center;
            background: #eee;
        }
        fieldset {
            border: 0;
        }
        ul {
            padding: 0;
        }
        .taborg * {
            font-family: sans-serif;
            font-size: 16px;
        }
        .taborg .page-title {
            font-size: 100px;
            opacity: .4;
            color: #fff;
            text-shadow:
                3px 3px 0 #000,
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000;
            background-color: <?php echo $color; ?>;
            padding: 1rem 0 2rem;
            margin: .5rem auto 3rem;
        }
        .taborg input {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
        }
        .taborg .options {
            list-style-type: none;
            display: inline-block;
            vertical-align: top;
            margin: .5rem;
        }
        .taborg .options a {
            display: block;
            width: 100%;
        }
        .taborg .input-list .options {
            position: relative;
            width: calc(18% - 2rem);
        }
        .taborg .input-list .options input {
            visibility: hidden;
            position: absolute;
        }
        .taborg .input-list .options input:checked + label {
            opacity: 1;
            border: 3px solid #555;
            box-shadow:
                2px 2px 0 #555,
                2px 2px 1px #555,
                2px 2px 2px #555,
                3px 3px 0 #555,
                -1px -1px 0 #555,
                1px -1px 0 #555,
                -1px 1px 0 #555,
                1px 1px 0 #555;
        }
        .taborg .input-list .options label {
            font-weight: bold;
            /*text-shadow:
                0px 0px 3px #fff,
                0px 0px 2px #fff,
                0px 0px 1px #fff,
                -1px -1px 1px #fff,
                0px -1px 1px #fff,
                -1px 0px 1px #fff,
                1px 0px 1px #fff,
                0px 1px 1px #fff,
                1px 1px 0px #fff;*/
            color: #000;
            /*letter-spacing: .05em;*/
            /*text-shadow:
                2px 2px 0 rgba(238, 238, 238, .4),
                2px 2px 1px rgba(238, 238, 238, .4),
                2px 2px 2px rgba(238, 238, 238, .4),
                3px 3px 0 rgba(238, 238, 238, .4),
                -1px -1px 0 rgba(238, 238, 238, .4),
                1px -1px 0 rgba(238, 238, 238, .4),
                -1px 1px 0 rgba(238, 238, 238, .4),
                1px 1px 0 rgba(238, 238, 238, .4);*/
            border: 1px solid #999;
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            display: block;
            transition: all 0.5s ease;
            opacity: .4;
            cursor: pointer;
            background-color: #fff;
        }
        .taborg .input-list .options label.invert {
            color: #fff;
        }
        .taborg input.text {
            width: 40%;
            display: block;
            margin: .5rem auto 2rem;
            text-align: center;
            font-size: 24px;
            font-style: italic;
            font-family: Georgia, serif;
            font-weight: bold;
            color: #555;
            border-radius: 5px;
            border: 1px solid #aaa;
            box-shadow: inset 1px 1px 3px #ccc;
        }
        .taborg input.submit {
            width: 20%;
            height: auto;
            border: 1px solid #b63900;
            background: rgba(232, 104, 46, 1);
            margin: 2rem auto 10rem;
            color: #fff;
            line-height: 2.3em;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            text-shadow:
                2px 2px 0 #d74300,
                2px 2px 1px #d74300,
                2px 2px 2px #d74300,
                3px 3px 0 #d74300,
                -1px -1px 0 #d74300,
                1px -1px 0 #d74300,
                -1px 1px 0 #d74300,
                1px 1px 0 #d74300;
        }
    </style>
</head>
<body class="taborg">
    <h1 class="page-title"><?php echo $separator . ' ' . $text; ?></h1>
    <form id="taborg-form" action="/" method="get">

        <label id="label-tab-text" for="tab-text">Tab Text</label>
        <input type="text" id="tab-text" name="text" class="text" placeholder="Enter tab text here..." <?php echo isset($text) && $text !== '' ? 'value="' . $text . '"' : ''; ?>>

        <fieldset id="colors" class="input-list">
            <ul>
                <li class="options">
                    <input type="radio" id="select-none"  name="color" value="">
                    <label id="label-select-none" for="select-none">None</label>
                </li>
                <?php
                foreach (Definitions::$colors as $key => $colorAttr) {
                    if ($key === $color) {
                        $isSelected = 'checked="checked"';
                        $isActiveParent = 'active';
                    } else {
                        $isSelected = '';
                        $isActiveParent = '';
                    }
                    echo '<li class="options ' . $isActiveParent . '">';
                    echo '<input type="radio" id="select-' .
                            $key . '" name="color" value="' . $key . '" ' . $isSelected . '>';
                    echo '<label id="label-select-' . $key . '" for="select-' . $key . '" class="' . Definitions::isColorInvert($key)  . '" style="background: rgba(' . Definitions::getColorRgb($key) . ', .7);">' . $key . '</label>';
                    echo '</li>';
                }
                ?>
            </ul>
        </fieldset>

        <fieldset id="characters" class="input-list">
            <ul>
                <li class="options">
                    <input type="checkbox" name="include-in-title" id="include-in-title" <?php echo ($includeInTitle === 'on' ? 'checked="checked"' : ''); ?>>
                    <label id="label-include-in-title" for="include-in-title">Include character in title?</label>
                </li>
            </ul>
            <ul>
                <?php
                foreach (Definitions::$characters as $key => $char) {
                    if ($separatorKey === $key) {
                        $isSelected = 'checked="checked"';
                        $isActiveParent = 'active';
                    } else {
                        $isSelected = '';
                        $isActiveParent = '';
                    }
                    echo '<li class="options ' . $isActiveParent . '">';
                    echo '<input type="radio" id="select-' . $key .
                        '" name="separator" value="' . $key . '" ' . $isSelected . '>';
                    echo '<label id="label-select-' . $key . '" for="select-' . $key . '">' .
                            $char . ' (' . $key . ')</label>';
                    echo '</li>';
                }
                ?>
            </ul>
        </fieldset>

        <input type="submit" class="submit" value="Save settings">

        <!-- <p style="font-family: sans-serif; font-size: 200px; font-weight: bold;">
            <?php echo $separator . ' ' . $text; ?></p>
        -->
    </form>

    <script>
        /*=============================
        =            TESTS            =
        =============================*/

        var enableTests = (function() {
            var checkQsVal = function(locationSearchString, parameter) {
                var val = false;
                locationSearchString.substr(1).split('&').map(function(part) {
                    val = part.split('=').indexOf(parameter) >=0 ? true : false;
                });
                return val;
            };

            // Check if query string has enableTests=true
            // Then create global TestsQuoteForm
            if(checkQsVal(window.location.search, 'enableTests')) {
                window.TestsQuoteForm = {
                    debug: {}
                };
                console.log('TestsQuoteForm debug', window.TestsQuoteForm);
            }
        })();

        /*=====  End of TESTS  ======*/




        var checkLoad = function(el_id, callback, index) {
            if(document.getElementById(el_id)) {
                // Capture for TESTS
                if(window.TestsQuoteForm) {
                    console.log('loaded: ', el_id.innerHTML);
                }
                // END Capture for TESTS
                callback();
            } else if(index <= 20) {
                setTimeout(function() {
                    // Capture for TESTS
                    if(window.TestsQuoteForm) {
                        console.log('checking load of:', el_id);
                        console.log(index);
                    }
                    // END Capture for TESTS
                    index++;
                    checkLoad(el_id, null, index);
                }, 500);
            } else {
                console.log('Timeout error');
            }
        };
        var optionsListener = function() {

        };
        checkLoad('colors', optionsListener, 0);



        // document.getElementById('myButton').onclick = function() {

        //     var className = ' ' + myButton.className + ' ';

        //     if ( ~className.indexOf(' active ') ) {
        //         this.className = className.replace(' active ', ' ');
        //     } else {
        //         this.className += ' active';
        //     }
        // }
        // document.getElementById('colors').onclick = function() {
        //     alert('yep');
        // }
        // document.getElementById('colors').querySelector('.options').onclick = function() {
        //     alert('bla bla');
        // }
    </script>
</body>
</html>