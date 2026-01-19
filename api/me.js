import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "")

  const { data: { user } } = await supabase.auth.getUser(token)

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  res.status(200).json(data)
}
