const ListHeader = () => {
  return (
    <header
      className={
        "flex justify-between w-full max-w-[1024px] mx-auto py-6 items-center"
      }
    >
      <span className={"font-serif font-bold"}>NFT GALLERY</span>
      <button className={"font-serif border border-black p-3"}>
        Connect Wallet
      </button>
    </header>
  );
};

export default ListHeader;
