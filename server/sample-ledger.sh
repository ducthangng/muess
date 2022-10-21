# alter your path to fabric sample here.
# ducthangng sample fabric_path='/Users/nickp/Desktop/VGULearning/Project/fabric-samples'
fabric_path = '/your/path/to/fabric-samples'

# download the library
cd $fabric_path/test-network && ./network.sh down 

# start the network && create config channel
cd $fabric_path/test-network && ./network.sh up createChannel -c munich

# deploy the chaincode
# -ccep "OR('Org1MSP.peer','Org2MSP.peer')" means that the chaincode can be deployed by any peer of Org1MSP or Org2MSP [OPTIONAL]
cd $fabric_path/test-network && ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-typescript -ccl typescript -c munich

# export paths
cd $fabric_path/test-network 
	echo "${PWD}" 
	export PATH=${fabric_path}/bin:${PWD}:$PATH 
	export FABRIC_CFG_PATH=${fabric_path}/config/
	export CORE_PEER_TLS_ENABLED=true
	export CORE_PEER_LOCALMSPID="Org1MSP"
	export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
	export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
	export CORE_PEER_ADDRESS=localhost:7051
	
# invoke the chaincode
echo "===================== Invoke transaction on peer0.org1 on channel 'munich'... ===================== "
cd $fabric_path/test-network 
	peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C munich -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'

# export paths
cd $fabric_path/test-network 
	export CORE_PEER_TLS_ENABLED=true
	export CORE_PEER_LOCALMSPID="Org2MSP"
	export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
	export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
	export CORE_PEER_ADDRESS=localhost:9051
