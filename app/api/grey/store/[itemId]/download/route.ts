import { NextResponse } from "next/server";

import { getStoreItemById } from "@/lib/grey/config";
import { createGreyStorePdf } from "@/lib/grey/pdf";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ itemId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { itemId } = await context.params;
    const item = getStoreItemById(itemId);
    if (!item) {
      return NextResponse.json({ error: "Unknown Grey Store item." }, { status: 404 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    const { data } = await supabase
      .from("grey_store_redemptions")
      .select("id")
      .eq("user_id", user.id)
      .eq("item_id", item.id)
      .maybeSingle();

    if (!data) {
      return NextResponse.json(
        { error: "Redeem this item before downloading it." },
        { status: 403 }
      );
    }

    const pdf = createGreyStorePdf(item);
    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${item.filename}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not prepare Grey Store download." },
      { status: 500 }
    );
  }
}
