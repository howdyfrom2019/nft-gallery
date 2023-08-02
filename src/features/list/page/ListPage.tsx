import ListBoard from "@/features/list/components/ListBoard";
import ListHeader from "@/features/list/components/ListHeader";
import NFTForm from "@/features/list/components/NftForm";

const ListPage = () => {
  return (
    <main className={"flex flex-col"}>
      <ListHeader />
      <NFTForm />
      <ListBoard />
    </main>
  );
};

export default ListPage;
