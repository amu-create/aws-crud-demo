import { NextRequest, NextResponse } from 'next/server';
import { PutCommand, ScanCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { dynamodb, TABLE_NAME } from '@/lib/dynamodb';
import { randomUUID } from 'crypto';

// GET - 모든 아이템 조회 또는 특정 아이템 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // 특정 아이템 조회
      const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { id }
      });
      const result = await dynamodb.send(command);
      
      if (!result.Item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
      }
      
      return NextResponse.json(result.Item);
    } else {
      // 모든 아이템 조회
      const command = new ScanCommand({
        TableName: TABLE_NAME
      });
      const result = await dynamodb.send(command);
      return NextResponse.json(result.Items || []);
    }
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// POST - 새 아이템 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...body
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    });

    await dynamodb.send(command);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

// PUT - 아이템 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const item = {
      id,
      updatedAt: new Date().toISOString(),
      ...updateData
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    });

    await dynamodb.send(command);
    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE - 아이템 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id }
    });

    await dynamodb.send(command);
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
