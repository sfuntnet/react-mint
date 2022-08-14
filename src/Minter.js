import {useEffect, useState} from "react";
import {connectWallet, getCurrentWalletConnected, mintNFT} from "./utils/interact.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "reactstrap";

const Minter = (props) => {


    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setURL] = useState("");

    useEffect(async () => {
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status);

        addWalletListener();
    }, []);

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    const onMintPressed = async () => {
        const {status} = await mintNFT(url, name, description);
        setStatus(status);
    };

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("👆🏽 Write a message in the text-field above.");
                } else {
                    setWallet("");
                    setStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                    </a>
                </p>
            );
        }
    }

    return (
        <div className="Minter">
            <Row>
                <Col lg={12}>
                    <button id="walletButton" onClick={connectWalletPressed}>
                        <Row>
                            <Col lg={3}>
                                <img src={require('./icon/metamask.png').default}/>
                            </Col>
                            <Col lg={5} className='mt-1'>
                                <span>MetaMask</span>
                            </Col>
                            <Col lg={3}>
                                {walletAddress.length > 0 ? (
                                    <span><img src={require('./icon/circle-16green.png').default}/></span>
                                ) : (
                                    <span><img src={require('./icon/circle-16.png').default}/></span>
                                )}
                            </Col>
                        </Row>
                    </button>
                </Col>
                <Col lg={12}>
                    <button id="walletButton2" >
                        <Row>
                            <Col lg={2}>
                                <img src={require('./icon/coinbase.png').default}/>
                            </Col>
                            <Col lg={9} className='mt-1'>
                                <span>Coinbase Wallet</span>
                            </Col>
                        </Row>
                    </button>
                </Col>
                <Col lg={12} >
                    <button id="walletButton3" >
                        <Row>
                            <Col lg={2}>
                                <img  src={require('./icon/walletconnect.png').default}/>
                            </Col>
                            <Col lg={9} className='mt-1'>
                                <span>WalletConnect</span>
                            </Col>
                        </Row>
                    </button>
                </Col>
            </Row>
            <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
            <p>
                Simply add your asset's link, name, and description, then press "Mint."
            </p>
            <form>
                <h2>🖼 Link to asset: </h2>
                <input
                    type="text"
                    placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
                    onChange={(event) => setURL(event.target.value)}
                />
                <h2>🤔 Name: </h2>
                <input
                    type="text"
                    placeholder="e.g. My first NFT!"
                    onChange={(event) => setName(event.target.value)}
                />
                <h2>✍️ Description: </h2>
                <input
                    type="text"
                    placeholder="e.g. Even cooler than cryptokitties ;)"
                    onChange={(event) => setDescription(event.target.value)}
                />
            </form>
            <button id="mintButton" onClick={onMintPressed}>
                Mint NFT
            </button>
            <p id="status">
                {status}
            </p>
        </div>
    );
};

export default Minter;
