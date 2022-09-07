import React from 'react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import { isGeneratorFunction } from 'util/types';
import Link from 'next/link';
import { Nav } from "../../compornents/nav_format"
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/bootstrap.css';
// import '../../styles/itemList.css'

const fetcher = (url: any) => fetch(url).then((res) => res.json());
function Page() {
  const { data, error } = useSWR(
    'http://localhost:8000/items',
    fetcher
  );

  const [search, setSearch] = useState(data);
  const [kensaku, setKensaku] = useState('');
  const [gaitouDisplay, setGaitouDisplay] = useState('none');

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleClick = (e: any) => {
    const result = data.filter((item: any) => {
      return item.name.match(kensaku);
    });
    // console.log('result', result);
    setSearch(result);

    console.log("search",search)
    console.log("kensaku",kensaku)
    if (result.length > 0 || kensaku == '') {
      console.log("none")
      setGaitouDisplay('none');
    } else
    // if (!search || search.length === 0 ) 
    {
      console.log('block')
      setGaitouDisplay('block');
    }
  };

  // console.log('search', search);
  // console.log('kensaku', kensaku.length);

  // const narabikae = [data];
  // data.sort((a: any, b: any) => {
  //   return a.price < b.price ? -1 : 1;
  // });

  return (
    <>
      <Head>
        <title>ラクスヌードル</title>
      </Head>

      <Nav name=""/>

      <div className="row">
        <div className="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-10 col-xs-12 mannaka">
          <div className="panel panel-default">
            <div className="panel-heading">
            <div className="panel-title">商品を検索する</div>
            </div>
            <div className="panel-body">
              <form method="post" action="#" className="form-horizontal">
                <div className="form-group" />
                  <label  className="control-label col-sm-2">商品名</label>
                  
      <div className="col-sm-9">
      <div className="col-sm-9">
                    <input
                      type="text"
                      name="kensaku"
                      id="form1"
                      className="form-control input-sm"
                      value={kensaku}
                      onChange={(e) => setKensaku(e.target.value)}
                    />
                  </div>
                  </div>
        
                  <div className="text-center">
        <button type="button" value="検索" className="btn btn-primary" onClick={(e) => handleClick(e)}>
          検索
        </button>

        <button
          type="button"
          value="クリア"
          className="btn btn-default"
          onClick={() => {
            setKensaku('');
            // setGaitouDisplay('none');
          }}
        >
          クリア
        </button>
        </div>
      </form>
      </div>
          </div>
        </div>
      </div>


      <p id="gaitou"  className="gaitou" style={{ display: gaitouDisplay }}>
        該当の商品がありません
      </p>
      <div className="row">
        <div
          className="table-responsive col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-10 col-xs-12 mannaka"
        >
          <table className="table table-striped item-list-table">
        {/* <thead>
          <tr>
            <th className="haba">画像</th>
            <th className="haba">商品名</th>
            <th className="haba">価格</th>
          </tr>
        </thead>
         */}

        <tbody>
        <div className="wrapper">
          
          {!search?.length &&

            data.map((item: any) => {
              return (
                <tr className="flexbox flexbox-center">
                  <td className="imag">
                  <Link href={`http://localhost:3000/items/${item.id}`}>
                 <a> <Image src={item.img} width={200} height={143} className="img-responsive img-rounded item-img-cente" /></a>
                  </Link>
                  </td>
                  <Link href={`http://localhost:3000/items/${item.id}`}>
                  <a><td className="haba">{item.name}</td></a>
                  </Link>
                  <td className="haba">{item.price}円</td>
                </tr>
              );
            })}
            </div>

          <div className="wrapper">
          {search?.length > 0 &&
            search.map((item: any) => {
              // let number = index + 1 ;
              return (
                <tr className="flexbox flexbox-center">
                <td className="imag">
                <Link href={`http://localhost:3000/items/${item.id}`}>
                <a><Image src={item.img} width={200} height={143} className="img-responsive img-rounded item-img-cente" /></a>
                </Link>
                </td>
                <Link href={`http://localhost:3000/items/${item.id}`}>
                <a><td className="haba">{item.name}</td></a>
                </Link>
                <td className="haba">{item.price}円</td>
              </tr>
              );
            })}
            </div>
        </tbody>
      </table>
        </div>
      </div>
    </>
  );
}

export default Page;
