curl -L -O -C - https://expose.sh/downloads/expose-mac.gz --output expose-mac.gz

gunzip expose-mac.gz && mv expose-mac expose
chmod +x expose

# If /usr/local/bin does not exist, create it e.g. for Catalina this folder is in the PATH but it does not exist
mkdir -p /usr/local/bin

sudo mv expose /usr/local/bin/expose

# Try to run expose, no output
expose > /dev/null

# If expose ran succesfully, show error message or show installation failed message if not
if [ $? -eq 0 ]
then
    echo ""
    echo '  ____ ___  _________   ____  ______ ____'
    echo '_/ __ \\  \/  /\____ \ /  _ \/  ___// __ \'
    echo '\  ___/ >    < |  |_> >  <_> )___ \\  ___/'
    echo ' \___  >__/\_ \|   __/ \____/____  >\___  >'
    echo '     \/      \/|__|              \/     \/'

    echo ""
    echo "Congrats! expose is now installed 😃"
    echo "Now what?"
    echo " - Get a random public URL for a local server: \"expose <port>\" e.g. \"expose 80\" if your server is running on port 80"
    echo " - Get a customized public URL for a local server (Subscription required): \"expose 80 as mysite.expose.sh\""
    echo " - Read the docs for more detailed instructions https://expose.sh/docs"
else
    echo ""
    echo "Installation failed. Please email robbie@expose.sh and include your Mac OS X version and copy/paste your terminal output"
    echo ""
fi