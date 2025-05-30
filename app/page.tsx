'use client';

import { useState, useEffect } from 'react';

interface Item {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // 아이템 목록 불러오기
  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 아이템 생성 또는 업데이트
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // 업데이트
        const response = await fetch('/api/items', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData })
        });
        
        if (response.ok) {
          await fetchItems();
          resetForm();
        }
      } else {
        // 생성
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          await fetchItems();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  // 아이템 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/items?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchItems();
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // 편집 모드 설정
  const handleEdit = (item: Item) => {
    setFormData({
      title: item.title,
      description: item.description,
      status: item.status
    });
    setEditingId(item.id);
  };

  // 폼 초기화
  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'active' });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AWS CRUD Demo with DynamoDB</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? '아이템 수정' : '새 아이템 추가'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">상태</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editingId ? '수정' : '추가'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    취소
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* 아이템 목록 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">아이템 목록 ({items.length}개)</h2>
            <div className="space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500">아이템이 없습니다.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded ${
                            item.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status === 'active' ? '활성' : '비활성'}
                          </span>
                          {item.createdAt && (
                            <span>생성: {new Date(item.createdAt).toLocaleString('ko-KR')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* AWS 정보 */}
        <div className="mt-8 bg-gray-100 p-4 rounded text-sm text-gray-600">
          <p>🚀 이 앱은 AWS DynamoDB를 사용합니다</p>
          <p>📊 테이블명: aws-crud-demo-items</p>
          <p>💰 프리티어: 25GB 스토리지, 월 5천만 요청 무료</p>
        </div>
      </div>
    </div>
  );
}
