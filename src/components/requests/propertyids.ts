import { postFetchWithTor } from "../lib/tor";

const polyfills = [
  // "rze{Felqi`@?wrDfhD??vrDghD?",
  // "j}e{F}qvi`@?wrDfhD??vrDghD?",
  // "jff{Fyf{i`@?wrDfhD??vrDghD?",
  // "|zb{Fep~i`@?wrDfhD??vrDghD?",
  // "rzb{Fizxi`@?wrDhhD??vrDihD?",
  // "|xb{F{iti`@?wrDfhD??vrDghD?",
  // "z{b{F_boi`@?yrDhhD??xrDihD?",
  // "zy_{Fygoi`@?wrDjhD??vrDkhD?",
  // "by_{Filti`@?wrDhhD??vrDihD?",
  // "l~_{Fagyi`@?wrDhhD??vrDihD?",
  // "`|_{Fa{}i`@?wrDhhD??vrDihD?",
  // "fz|zFkl~i`@?wrDjhD??vrDkhD?",
  // "`z|zFmewi`@?wrDjhD??vrDkhD?",
  // "`z|zFghri`@?wrDjhD??vrDkhD?",
  // "d||zFqfmi`@?wrDjhD??vrDkhD?",
  // "|s|zFewhi`@?yrDjhD??xrDkhD?",
  // "p~xzF_yei`@?wrDlhD??vrDmhD?",
  // "ndyzFejki`@?wrDlhD??vrDmhD?",
  // "leyzFs~oi`@?wrDlhD??vrDmhD?",
  // "`gyzFkati`@?yrDlhD??xrDmhD?",
  // "xutzFkzvi`@?wrDnhD??vrDohD?",
  // "`|tzFgmzi`@?wrDnhD??vrDohD?",
  // "f|tzFyqri`@?wrDnhD??vrDohD?",
  // "|lqzFatii`@?wrDphD??vrDqhD?",
  // "rpqzFq~wi`@?wrDnhD??vrDohD?",
  // "jpqzFox{i`@?wrDphD??vrDqhD?",
  // "roqzFs|_j`@?wrDnhD??vrDohD?",
  // "xlqzF}pcj`@?wrDphD??vrDqhD?",
  // "vrqzFkehj`@?wrDphD??vrDqhD?",
  // "twqzFwmlj`@?wrDphD??vrDqhD?",
  // "|~qzFaspj`@?wrDphD??vrDqhD?",
  // "zsszFsumj`@?wrDnhD??vrDohD?",
  // "~lwzFitnj`@?wrDlhD??vrDmhD?",
  // "jc{zFspmj`@?wrDjhD??vrDkhD?",
  // "ze~zFeikj`@?yrDhhD??xrDihD?",
  // "lavzFyasj`@?wrDlhD??vrDmhD?",
  // "t`qzF_}uj`@?yrDphD??xrDqhD?",
  // "vruzFs~uj`@?wrDlhD??vrDmhD?",
  // "~dzzFovvj`@?yrDjhD??xrDkhD?",
  // "ra~zFiwuj`@?wrDjhD??vrDkhD?",
  // "~myzFijxj`@?wrDlhD??vrDmhD?",
  // "jvwzF{i|j`@?wrDlhD??vrDmhD?",
  // "v{lzF}hgj`@?yrDphD??xrDqhD?",
  // "lbnzFcjkj`@?wrDphD??vrDqhD?",
  // "bmnzFyvpj`@?wrDphD??vrDqhD?",
  // "|nnzFqxuj`@?wrDphD??vrDqhD?",
  // "bpnzFa}zj`@?yrDphD??xrDqhD?",
  // "tejzFej{j`@?yrDrhD??xrDshD?",
  // "tejzFimtj`@?wrDrhD??vrDshD?",
  // "xfjzF_uoj`@?wrDrhD??vrDshD?",
  // "jhjzFqwjj`@?wrDrhD??vrDshD?",
  // "xegzFc~jj`@?wrDthD??vrDuhD?",
  // "jjgzFuyoj`@?wrDrhD??vrDshD?",
  // "zpgzFeptj`@?yrDthD??xrDuhD?",
  // "xxgzFojyj`@?wrDrhD??vrDshD?",
  // "~zgzFuo}j`@?yrDrhD??xrDshD?",
  // "jrdzFi{}j`@?wrDvhD??vrDwhD?",
  // "l{dzFizxj`@?yrDthD??xrDuhD?",
  // "p~dzF{{tj`@?wrDthD??vrDuhD?",
  // "dabzFwe{j`@?wrDvhD??vrDwhD?",
  // "~bbzFoj_k`@?wrDvhD??vrDwhD?",
  // "~bbzFaqck`@?yrDvhD??xrDwhD?",
  // "zlbzFk{gk`@?wrDvhD??vrDwhD?",
  // "~d_zFwxdk`@?y`DzwC??x`D{wC?",
  // "lf_zFwtik`@?{`DzwC??z`D{wC?",
  // "|q}yFqzmk`@?{`DzwC??z`D{wC?",
  // "no{yFsdqk`@?{`D|wC??z`D}wC?",
  // "rsxyFabtk`@?y`D|wC??x`D}wC?",
  // "tnvyFkfxk`@?{`D|wC??z`D}wC?",
  // "vbvyFu~rk`@?y`D~wC??x`D_xC?",
  // "v~szFq|vi`@?wrDnhD??vrDohD?",
  // "jqrzF{a{i`@?wrDphD??vrDqhD?",
  // "|lozFgn_j`@?wrDphD??vrDqhD?",
  // "lbnzFmqbj`@?yrDrhD??xrDshD?",
  // "b_kzFw}aj`@?yrDphD??xrDqhD?",
  // "~wlzF_m}i`@?wrDrhD??vrDshD?",
  // "n`pzF}yxi`@?yrDphD??xrDqhD?",
  // "r{rzF_fui`@?wrDphD??vrDqhD?",
  // "rznzFu|ti`@?wrDphD??vrDqhD?",
  // "dkmzF}tyi`@?gdE`yD??fdEayD?",
  // "fpkzFs{~i`@?gdEbyD??fdEcyD?",
  // "tzkzFgwyi`@?gdE`yD??fdEayD?",
  // "voizFiayi`@?gdEbyD??fdEcyD?",
  "ddhzFok~i`@?gdEdyD??fdEeyD?",
  // "fqfzF_raj`@?gdEdyD??fdEeyD?",
  // "tybzFuqbj`@?gdEfyD??fdEgyD?",
  // "b~bzFwe~i`@?gdEfyD??fdEgyD?",
  // "fh`zF}v}i`@?edEfyD??ddEgyD?",
  // "zw_zF}ncj`@?edEhyD??ddEiyD?",
  // "`a~yFgyhj`@?edEhyD??ddEiyD?",
  // "xk}yFep}i`@?ogH~vG??ngH_wG?",
  // "dyxyFqq~i`@?koFbbF??joFcbF?",
  // "p~uyFy~ej`@?koFbbF??joFcbF?",
  // "xiqyF_fdj`@?koFfbF??joFgbF?",
  // "lvlyF_igj`@?koFhbF??joFibF?",
  // "j`jyFcvjj`@?koFjbF??joFkbF?",
  // "`c`yFiivj`@?koFnbF??joFobF?",
  // "h|xyFyfij`@?gmGh~F??fmGi~F?",
  // "`_wyFoxmj`@?gmGj~F??fmGk~F?",
  // "bxzyFabrj`@?gmGf~F??fmGg~F?",
  // "f|`yFmxrj`@?qiKltJ??piKmtJ?",
  // "zhwxFy|{j`@?ibJnoI??hbJooI?",
  // "|qrxFau{j`@?gbJroI??fbJsoI?",
  // "xukxFki~j`@?ibJxoI??hbJyoI?",
  // "l`qxF_dck`@?gbJtoI??fbJuoI?",
  // "z`jxFesdk`@?gbJzoI??fbJ{oI?",
  // "jwdxFwchk`@?gbJ~oI??fbJ_pI?",
  // "rhlxFcyjk`@?gbJvoI??fbJwoI?",
  // "vgbxFsxnk`@?gbJ`pI??fbJapI?",
  // "b`{wFucmk`@?ibJdpI??hbJepI?",
  // "lw{wFytuk`@?gbJfpI??fbJgpI?"
];

interface ResponsePoint {
  lat: number;
  long: number;
}

interface ResponseMapItem {
  item_id: string;
  id: string;
  state: number;
  price: number | null;
  point: ResponsePoint;
  url: string;
  featured_at: string;
  featured_plan: number;
  display_price_short: string;
  display_street_number: string;
}

interface ResponseMapPoints {
  map_items: ResponseMapItem[];
  hits: number;
  error: string;
}

export const getPolyfillOfMapPoints = async (polyfill: string): Promise<ResponseMapPoints | null> => {
  try {
    const response = await postFetchWithTor(`https://gateway.homes.co.nz/map/dots`,
      {
        "polylines": [
          polyfill
        ],
        "limit": 6000,
        "display_rentals": false,
        "for_rent": true,
        "for_sale": true,
        "just_sold": true,
        "off_market": true
      }
    ) as any;

    const responseBody = (await response).responseBody as ResponseMapPoints;

    return responseBody;
  } catch (error) {
    console.error(`Failed to fetch properties for polyfill ${polyfill}:`, error);
    return null;
  }
}

export const getAllPropertyIdsFromExternal = async (): Promise<string[]> => {
  const results: string[] = [];

  const promises = polyfills.map(polyfill => getPolyfillOfMapPoints(polyfill));
  const responses = await Promise.all(promises);

  responses.forEach(response => {
    if (response) {
      response.map_items.forEach(item => {
        results.push(item.id);
      });
    }
  });

  return results;
}
