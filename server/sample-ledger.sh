# alter your path to fabric sample here.
# ducthangng sample fabric_path='/Users/nickp/Desktop/VGULearning/Project/fabric-samples'
fabric_path=''

# download the library
pushd ./test-network/
#cd test-network && ./network.sh down
./network.sh down
popd 

# start the network && create config channel
pushd ./test-network/
./network.sh up createChannel -c munich -ca -s couchdb
# /network.sh up createChannel -ca -s couchdb
popd

# deploy the chaincode
# -ccep "OR('Org1MSP.peer','Org2MSP.peer')" means that the chaincode can be deployed by any peer of Org1MSP or Org2MSP [OPTIONAL]
pushd ./test-network/
# ./network.sh deployCC -ccn prive -ccp ../asset-transfer-basic/chaincode-typescript -ccl typescript -c munich
./network.sh deployCC -ccn private -ccp ../chaincode/ -ccl go -ccep "OR('Org1MSP.peer','Org2MSP.peer')" -cccg ../chaincode/collections_config.json
popd

# export paths
pushd ./test-network/
	echo "${PWD}" 
	# export PATH=/bin:${PWD}:$PATH
	export PATH=${PWD}/../bin:$PATH 
	export FABRIC_CFG_PATH=${PWD}/../config/
	export CORE_PEER_TLS_ENABLED=true
	export CORE_PEER_LOCALMSPID="Org1MSP"
	export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
	export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
	export CORE_PEER_ADDRESS=localhost:7051
popd

# export paths
pushd ./test-network/
	export CORE_PEER_TLS_ENABLED=true
	export CORE_PEER_LOCALMSPID="Org2MSP"
	export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
	export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
	export CORE_PEER_ADDRESS=localhost:9051
popd

# invoke the chaincode
echo "===================== Invoke transaction on peer0.org1 on channel 'munich'... ===================== "

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C munich -n private --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'