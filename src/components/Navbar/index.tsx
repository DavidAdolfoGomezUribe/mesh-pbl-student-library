import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@meshsdk/react";
import { useWalletList  } from "@meshsdk/react";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  const { connect, disconnect, connected, name } = useWallet();
  const wallets = useWalletList();

  const handleConnect = (walletId: string) => {
    connect(walletId);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <div className="h-6 w-6">
            <Image
              src={`/logo-mesh-black-512x512.png`}
              alt="Mesh"
              width={512}
              height={512}
            />
          </div>
          <span className="sr-only">Mesh</span>
        </Link>
        <Link href="/" className="text-foreground transition-colors hover:text-foreground">
          Mesh PBL Student Library
        </Link>
        <Link href="https://meshjs.dev/" className="text-muted-foreground transition-colors hover:text-foreground">
          Mesh SDK
        </Link>
        <Link href="https://pbl.meshjs.dev/" className="text-muted-foreground transition-colors hover:text-foreground">
          Mesh Project Based Learning
        </Link>
        <Link href="https://docs.meshjs.dev/" className="text-muted-foreground transition-colors hover:text-foreground">
          Mesh Docs
        </Link>
      </nav>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {connected ? (
            <Button onClick={disconnect}>
              Desconectar ({name})
            </Button>
          ) : (
            <div className="flex gap-2 items-center">
              {wallets.length > 0 ? (
                wallets.map((wallet) => (
                  <Button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    className="flex items-center gap-2"
                  >
                    <Image src={wallet.icon} alt={wallet.name} width={20} height={20} />
                    {wallet.name}
                  </Button>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No wallets detected
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}