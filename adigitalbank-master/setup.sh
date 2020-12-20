#!/usr/bin/env bash

# Deploy contracts
truffle migrate --reset --network rinkeby

# Verify Contracts on Etherscan
#truffle run verify DigitalBankToken --network rinkeby --license SPDX-License-Identifier
truffle run verify ZToken --network rinkeby --license SPDX-License-Identifier
truffle run verify yZToken --network rinkeby --license SPDX-License-Identifier
truffle run verify SushiBar --network rinkeby --license SPDX-License-Identifier
truffle run verify MasterChef --network rinkeby --license SPDX-License-Identifier

# Flatten Contracts
#./node_modules/.bin/truffle-flattener contracts/SushiToken.sol > flats/SushiToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/MasterChef.sol > flats/MasterChef_flat.sol
#./node_modules/.bin/truffle-flattener contracts/DigitalBankToken.sol > flats/SushiToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/ZToken.sol > flats/SushiToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/yZToken.sol > flats/SushiToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/SushiBar.sol > flats/SushiBar_flat.sol
#./node_modules/.bin/truffle-flattener contracts/MasterKey.sol > flats/MasterChef_flat.sol
