import Head from "next/head";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";
import AssetList from "../components/contributions/example/AssetList";

export default function AssetPage() {
  return (
    <div className="container">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link rel="icon" href="https://meshjs.dev/favicon/favicon-32x32.png" />
        <link href="https://meshjs.dev/css/template.css" rel="stylesheet" key="mesh-demo" />
      </Head>

      <main className="main">
        <h1 className="title">
          <a href="https://meshjs.dev/">Mesh</a> PBL
        </h1>

        <div className="demo">
          <CardanoWallet />
        </div>

        <div className="demo">
          <AssetList />
        </div>
      </main>

      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}
