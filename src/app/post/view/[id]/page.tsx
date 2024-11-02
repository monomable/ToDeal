import "../../../globals.css"

type Props = {
    params: {
      id: string;
    }
  }
  
  export default function Post({params}: Props) {
    return (
      <>
      <div className="title-box">{params.id}포스트</div>
      </>
    )
  }