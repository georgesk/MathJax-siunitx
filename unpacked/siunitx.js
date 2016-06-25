/*************************************************************
 *
 *  MathJax/extensions/TeX/siunitx.js
 *
 *  Implements some of the features provided by the siunitx LaTeX package.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2015 Yves Delley, https://github.com/burnpanck
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/siunitx"] = {
  version: "0.1.0"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {

  function RegisterCommands(SIunitxCommands) {
    var TEX = MathJax.InputJax.TeX;

    TEX.Definitions.Add({
      macros: {
        //
        //  Set up the macros for SI units
        //
        sisetup: 'SIunitx',
        si: 'SIunitx',
        SI: 'SIunitx',
        SIlist: 'SIunitx',
        SIrange: 'SIunitx',
        num: 'SIunitx',
        ang: 'SIunitx',
        numlist: 'SIunitx',
        numrange: 'SIunitx',
      }
    }, null, true);

    TEX.Parse.Augment({

      //
      //  Implements \SI and friends
      //
      SIunitx: function (name) {
        SIunitxCommands[name.slice(1)].call(this, name)
      }

    });

    //
    //  Indicate that the extension is ready
    //
    MathJax.Hub.Startup.signal.Post("TeX siunitx Ready");
  }

  var cb = MathJax.Callback(RegisterCommands);

  requirejs(['siunitx-commands'], cb);

  return cb;
});

MathJax.Ajax.loadComplete("[Contrib]/siunitx/unpacked/siunitx.js");
