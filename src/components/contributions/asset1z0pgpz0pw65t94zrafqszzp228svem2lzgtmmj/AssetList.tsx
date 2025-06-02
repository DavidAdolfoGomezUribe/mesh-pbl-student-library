"use client";

import { useAssets } from "@meshsdk/react";
import { useWallet } from "@meshsdk/react";
import { useLovelace } from "@meshsdk/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// David Adolfo Gomez Uribe #first atempt
// this is my little aport for the course , you can edit anything that you want, as you can see bellow
// you can see all the data from your wallet (wallet status and assets). 
// for loading the img its necesary to use blockfrost.io 
// i divided the code in sections if you need modularization this component
// i use eterln wallet and its working.


// -------------------------------------------------------------
// 1) Interface: first of all we need to make an interface for blocfrost and for the individual component
// -------------------------------------------------------------
interface BlockfrostAssetResponse {  // This is the blocfrost response. 
  asset: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  onchain_metadata?: {
    name?: string;
    image?: string;
    [key: string]: any; // only if there are other fields
  };
  [key: string]: any; // and for the rest of the fields
}

interface AssetItemProps {
  unit: string;
  
}

// -------------------------------------------------------------
// 2) Individual component: This component recives an "asset.unit" and then it makes a fetch to blocfrost.io
// , after that, extracts the img url from the metadata.
// -------------------------------------------------------------

const AssetItem: React.FC<AssetItemProps> = ({ unit }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiFingerprint, setApiFingerprint] = useState<string | null>(null);

  useEffect(() => {
    if (!unit) return;

    const API_KEY = "mainnetaIk3V76sGkxjt8mRUbY8BQOIQKspLAZk"; //set your api key from blockfros.io, you need to make an account.
    const ASSET_ID = unit;

    const fetchMetadata = async () => { 
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/assets/${ASSET_ID}`,
          {
            headers: { project_id: API_KEY },
          }
        );

        if (!res.ok) {
          throw new Error(`Blockfrost HTTP ${res.status} – ${res.statusText}`);
        }

        const data: BlockfrostAssetResponse = await res.json();

        setApiFingerprint(data.fingerprint);

        if (
          data.onchain_metadata &&
          typeof data.onchain_metadata.image === "string"
        ) {
          let imgField = data.onchain_metadata.image;
          imgField = imgField.replace(/^ipfs:\/+/, "https://ipfs.io/ipfs/"); //we need to replace ipfs/ for https://ipfs.io/ipfs/ to get the img
          setImageUrl(imgField);

        } else {
          setImageUrl(null);
        }
      } catch (err: any) {
        console.error("Error obtaining metadata:", err);
        setError(err.message || "Error desconocido");
        setImageUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [unit]);

  return (
    <li key={unit} className="flex flex-col p-2 border rounded">
      <p className="text-center">
        <strong >Fingerprint:</strong> 
      </p>
      <p className="truncate text-center">{apiFingerprint}</p>

      {loading && (
        <p className="text-sm text-gray-500">Loading metadata…</p>
      )}

      {error && (
        <p className="text-sm text-red-500">
          Error unable to load the image file: {error}
        </p>
      )}

      {imageUrl && !loading && !error && (
        <div className="mt-2 justify-center self-center">
          <Image
            width={250}
            height={250}
            src={imageUrl}
            alt={`NFT de asset ${unit}`}
            className="max-w-xs rounded shadow"
          />
        </div>
      )}

      {!imageUrl && !loading && !error && (
        <p className="text-sm text-gray-500">
          No image found in the metadata
        </p>
      )}
    </li>
  );
};

// -------------------------------------------------------------
// 3) Main component: for see all the info in your wallet
// -------------------------------------------------------------
export default function AssetList() {
  const assets = useAssets();
  const wallet = useWallet();
  const lovelace = useLovelace();

  const [visibleCount, setVisibleCount] = useState(10); // amount of images per click
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 10); // to see 10 more images
      setLoadingMore(false);
    }, 1000); // Delay for UX
  };

  return (

    <div className="p-4">
      <p className="mb-2 text-sm text-gray-700">
        {wallet.connected ? (
          <p>:D</p> //you can delete this
        ) : (
          <>
            <p> D: </p>
          </>
          
        )}
      </p>

      {wallet.connected ? (
        <>
          {/* <pre>{JSON.stringify(assets, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(wallet, null, 2)}</pre> */}
          <h1 className="text-4xl uppercase"> <strong>Selected wallet</strong> {wallet.name} </h1>
          <h1 className="text-3x1"> <strong>Conection status:</strong> {wallet.connected ? "True": "False"} </h1>
          <p>{ lovelace ?(
            <>  
              <p><strong>Wallet has :</strong> ${parseInt(lovelace) / 1000000}  ADA</p>  
              
            </>
        ) : "wallet is not connected"}</p>

          {/*<pre>{JSON.stringify(assets, null, 2)}</pre>*/}
          <h2 className="text-xl font-semibold mb-2">Your assets</h2>

          {(assets?.length ?? 0) > 0 ? (
            <>
           <ul className="bg-252525 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {assets?.slice(0, visibleCount).map((asset) => (
                <AssetItem key={asset.unit} unit={asset.unit} />
              ))}
          </ul>
              {visibleCount < (assets?.length ?? 0) && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                  >
                    {loadingMore ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500">
              There is no asstes in the wallet.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500">
          Conect your wallet to see your assets
        </p>
      )}
    </div>
  );
}