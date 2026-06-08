import { NextResponse } from "next/server";

import { redeemGreyStoreItem } from "@/lib/grey/server";
import { createClient } from "@/lib/supabase/server";

type RedeemBody = {
  itemId?: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    const body = (await request.json()) as RedeemBody;
    if (!body.itemId) {
      return NextResponse.json({ error: "Missing store item." }, { status: 400 });
    }

    const result = await redeemGreyStoreItem(supabase, user.id, body.itemId);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      redeemed: true,
      alreadyRedeemed: result.alreadyRedeemed,
      item: {
        id: result.item.id,
        title: result.item.title,
        cost: result.item.cost,
        filename: result.item.filename,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not redeem Grey Store item." },
      { status: 500 }
    );
  }
}
