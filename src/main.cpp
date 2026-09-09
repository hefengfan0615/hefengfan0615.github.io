/*
  Stockfish, a UCI chess playing engine derived from Glaurung 2.1
  Copyright (C) 2004-2026 The Stockfish developers (see AUTHORS file)

  Stockfish is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Stockfish is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

#include <iostream>
#include <memory>
#include <utility>

#include "attacks.h"
#include "misc.h"
#include "position.h"
#include "tune.h"
#include "uci.h"

using namespace Stockfish;

#if defined(__EMSCRIPTEN__)
    #include <emscripten.h>

// For WebAssembly builds (both single-threaded and pthreads) the web page does
// not run main().  Instead the page calls Module.send_command() which is wired
// (see emscripten/preamble.js) to this function.  Each call processes exactly
// one UCI command so that the JavaScript event loop stays responsive and can
// send "stop" to terminate an on-going search.
// Reference: https://github.com/official-pikafish/Pikafish (wasm branch).
extern "C" {
EMSCRIPTEN_KEEPALIVE
void wasm_uci_execute() {
    std::string input;
    std::getline(std::cin, input);

    if (input.empty())
        return;

    char* argv[2] = {input.data(), input.data()};
    auto  cli     = CommandLine(2, argv);

    static bool                       initialized = false;
    static std::unique_ptr<UCIEngine> uci;

    if (!initialized)
    {
        Attacks::init();
        Position::init();
        uci = std::make_unique<UCIEngine>(std::move(cli));
        Tune::init(uci->engine_options());
        initialized = true;
    }

    uci->set_cli(std::move(cli));
    uci->loop();
}
}
#endif

#ifdef UNIVERSAL_BINARY
namespace Stockfish {

int main(int argc, char* argv[]);  // silence 'no previous declaration'

__attribute__((used))  // keep main alive
#endif

int main(int argc, char* argv[]) {
    // In WASM builds main() ignores its args (the page drives the engine via
    // wasm_uci_execute()); cast them away so there is no unused-parameter warning.
    (void) argc;
    (void) argv;

    std::cout << engine_info() << std::endl;

    // In WASM builds main() is not used: the page drives the engine through
    // wasm_uci_execute() (see above and emscripten/preamble.js).
#ifndef __EMSCRIPTEN__
    Attacks::init();
    Position::init();

    auto cli = CommandLine(argc, argv);
    auto uci = std::make_unique<UCIEngine>(std::move(cli));

    Tune::init(uci->engine_options());

    uci->loop();
#endif

    return 0;
}

#ifdef UNIVERSAL_BINARY
}  // namespace Stockfish

    #ifdef UNIVERSAL_NEEDS_MAIN_SHIM
int main(int argc, char* argv[]) { return Stockfish::main(argc, argv); }
    #endif
#endif
