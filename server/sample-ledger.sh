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
./network.sh up createChannel -ca -s couchdb
# /network.sh up createChannel -ca -s couchdb
popd

# deploy the chaincode
# -ccep "OR('Org1MSP.peer','Org2MSP.peer')" means that the chaincode can be deployed by any peer of Org1MSP or Org2MSP [OPTIONAL]
pushd ./test-network/
# ./network.sh deployCC -ccn prive -ccp ../asset-transfer-basic/chaincode-typescript -ccl typescript -c munich
./network.sh deployCC -ccn muess -ccp ../chaincode/ -ccl javascript
popd
