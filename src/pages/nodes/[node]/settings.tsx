import NodeShell from "@/components/nodes/node/NodeShell"
import mongo from "@/lib/mongo"
import { sanitizeOne } from "@/lib/db"
import { connectOIDC } from "js-lxd"

export async function getServerSideProps({params, req}) {
    let nodeData = await mongo.db().collection("Node").findOne({name: params.node})
    let client = connectOIDC(nodeData.url, req.cookies.access_token)
    let resources = (await client.get("/resources")).data.metadata
    console.log(resources)

    return {
        props: {
            node: sanitizeOne(nodeData),
            resources: resources
        }
    }
}

export default function NodeDashboard({node, resources}) {
    return (
        <>
        <NodeShell node={node} resources={resources} />
        <p>Settings</p>
        </>
    )
}